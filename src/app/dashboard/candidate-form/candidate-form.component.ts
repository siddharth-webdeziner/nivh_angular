import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    disability: [''],
    mobileNo: [''],
    emailId: [''],
    address: [''],
    photo: [''],
    rciApplication: [''],
    adharCardNo: [''],
  });
  formSubmitStatus = false;
  candidateData: any;
  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.candidateData = this.getCandidateDetails();
  }

  setFormDetails(data: any) {
    this.candidateDetailsForm.controls['name'].setValue(data.FirstName)
    this.candidateDetailsForm.controls['enrollmentNumber'].setValue(data.EnrollmentNo)
    this.candidateDetailsForm.controls['enrollmentYear'].setValue(data.Annual_Year)
    this.candidateDetailsForm.controls['dob'].setValue(data.Dob)
  }


  getCandidateDetails() {
    const data = {
      CandidateId: 1,
      PageNumber: 1,
      PageSize: 1,
      SortColumn: 'FirstName'
    }
    this.commonService.getCandidateDetails(data).subscribe((res)=>{
      if(res) {
        console.log(res.Data.Items[0])
        this.setFormDetails(res.Data.Items[0])
        return res.Data.Items;
      } else {
        this.commonService.openErrorDialog("Wrong name or password!!");
      }
    })
  }

  candidateRegistration() {
    this.formSubmitStatus = true;
    console.log(this.candidateDetailsForm)
    if (this.candidateDetailsForm.invalid) {
      return;
    } else {
      this.commonService.updateCandidateRegistration(this.candidateDetailsForm).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            localStorage.setItem('loginStatus', 'loggedIn');
            this.router.navigate(['/candidate-details']);
          } else {
            this.commonService.openErrorDialog("Wrong name or password!!");  
          }
        } else {
          this.commonService.openErrorDialog("Wrong name or password!!");
        }
      })
    }
  }
}
