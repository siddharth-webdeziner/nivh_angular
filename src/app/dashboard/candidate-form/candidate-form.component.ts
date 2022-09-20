import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {
  candidateDetailsForm: FormGroup = this.formBuilder.group({
    name: [''],
    enrollmentNumber: [''],
    enrollmentYear: [''],
    dob: [''],
    fatherName: [''],
    motherName: [''],
    gender: [''],
    casteCat: [''],
    disability: [null],
    mobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    emailId: [''],
    address: [''],
    rciApplication: [''],
    adharCardNo: [''],
    photo: [''],
    signature: [''],
    disabilityInput: ['']
  });
  disabilityOptions = [
    {
      id: 1,
      value: "VI - Visually impaired"
    },
    {
      id: 2,
      value: "HI - Hearing impaired"
    },
    {
      id: 3,
      value: "OI - Orthopedic impaired"
    },
    {
      id: 4,
      value: "LD - Learning disability"
    }
  ]
  formSubmitStatus = false;
  candidateId: number;
  imageSrc: any;
  otherOptionDisability = false;
  loader: any;
  disability: any;
  otherOptionDisabilityNo = false;
  disabilityInputBox = false;
  userDetails: any;
  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoutes: ActivatedRoute
  ) {
    this.candidateId = this.activatedRoutes.snapshot.params['id'];
  }

  ngOnInit(): void {
    if(this.candidateId) {
      document.body.classList.add('display-loader');
      this.getCandidateDetails(this.candidateId);
    }
    this.userDetails = JSON.parse(localStorage.getItem('loginStatus') || '{}');
  }

  ngOnChanges() {

  }

  setFormDetails(data: any) {
    let optionsmatched = false;
    this.candidateDetailsForm.controls['name'].setValue(data.FirstName);
    this.candidateDetailsForm.controls['enrollmentNumber'].setValue(data.EnrollmentNo);
    this.candidateDetailsForm.controls['enrollmentYear'].setValue(data.Annual_Year);
    this.candidateDetailsForm.controls['dob'].setValue(data.Dob);
    this.candidateDetailsForm.controls['fatherName'].setValue(data.FatherName);
    this.candidateDetailsForm.controls['motherName'].setValue(data.MotherName);
    this.candidateDetailsForm.controls['gender'].setValue(data.Gender);
    this.candidateDetailsForm.controls['casteCat'].setValue(data.Caste);
    this.candidateDetailsForm.controls['mobileNo'].setValue(data.Mobile);
    this.candidateDetailsForm.controls['emailId'].setValue(data.Email);
    this.candidateDetailsForm.controls['address'].setValue(data.Address);
    this.candidateDetailsForm.controls['rciApplication'].setValue(data.RCI_application);
    this.candidateDetailsForm.controls['adharCardNo'].setValue(data.AdharNumber);
    if(data.Disability === null) {
      this.otherOptionDisability = false;
      this.otherOptionDisabilityNo = true;
    } else if(data.Disability !== 'No disability') {
      this.disability = data.Disability;
      this.otherOptionDisability = true;
      this.otherOptionDisabilityNo = false;
      let found = false;
      this.disabilityOptions.forEach((disability: any) => {
        if(disability.value === data.Disability) {
          this.disabilityInputBox = false;
          this.candidateDetailsForm.controls['disability'].setValue(data.Disability);
          found = true;
        } 
      });
      if(!found) {
        this.candidateDetailsForm.controls['disability'].setValue('Other');
        this.disabilityInputBox = true;
        this.candidateDetailsForm.controls['disabilityInput'].setValue(data.Disability);
      }
    } else {
      // this.candidateDetailsForm.controls['disability'].setValue('No disability');
      this.otherOptionDisability = false;
      this.otherOptionDisabilityNo = true;
    }
    this.candidateDetailsForm.controls['photo'].setValue(data.Photo);
    this.candidateDetailsForm.controls['signature'].setValue(data.Signature);
  }
  

  getCandidateDetails(id: number) {
    this.commonService.getSelectedCandidateDetails(id).subscribe((res)=>{
      if(res) {
        this.setFormDetails(res.Data)
      } else {
        this.commonService.openErrorDialog("Something went wrong!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

  candidateRegistration() {
    this.formSubmitStatus = true;
    this.loader = true;
    if (this.candidateDetailsForm.invalid) {
      this.loader = false;
      return;
    } else {
      this.commonService.updateCandidateRegistration(this.candidateDetailsForm, this.candidateId).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            this.commonService.openSuccessDialog("Candidate send to the course coordinator for verification!!");
            this.router.navigate(['../dashboard/my-details/'+this.candidateId]);
          } else {
            this.commonService.openErrorDialog(res.Message);  
          }
        } else {
          this.commonService.openErrorDialog(res.Message);
        }
        this.formSubmitStatus = false;
        this.loader = false;
      }, (err) => {
        console.log(err);
        this.formSubmitStatus = false;
        this.loader = false;
        this.commonService.openErrorDialog(err.Message);
      })
    }
    this.formSubmitStatus = false;
  }

  private imageSrcNew: string = '';
  private signatureSrcNew: string = '';
  private pic: string = '';
  handleInputChange(e: any, picture: string) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.pic = picture;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    if(this.pic === 'photo') {
      this.imageSrcNew = reader.result;
      this.candidateDetailsForm.controls['photo'].setValue(this.imageSrcNew);
    } else {
      this.signatureSrcNew = reader.result;
      this.candidateDetailsForm.controls['signature'].setValue(this.signatureSrcNew);
    }
    this.candidateDetailsForm.markAsDirty();
  }

  otherOption(e: any, valueChanges: boolean) {
    this.otherOptionDisability = valueChanges;
    if(valueChanges) {
      if(this.disability) {
        this.candidateDetailsForm.controls['disability'].setValue(this.disability);
      }
    } else {
      this.disabilityInputBox = valueChanges;
      this.candidateDetailsForm.controls['disabilityInput'].setValue(' ');
      this.candidateDetailsForm.controls['disability'].setValue('No disability');
    }
    this.candidateDetailsForm.markAsDirty();
  }
  
  selectDisability() {
    if(this.candidateDetailsForm.controls['disability'].value === 'Other') {
      this.candidateDetailsForm.controls['disabilityInput'].setValue('')
      this.disabilityInputBox = true;
    } else {
      this.candidateDetailsForm.controls['disabilityInput'].setValue(' ')
      this.disabilityInputBox = false;
    }
  }

}
