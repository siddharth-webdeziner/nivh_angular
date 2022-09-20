import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-register',
  templateUrl: './update-register.component.html',
  styleUrls: ['./update-register.component.scss']
})
export class UpdateRegisterComponent implements OnInit {
  updateCandidateRegisterForm: FormGroup = this.formBuilder.group({
    stateCode: [''],
    centerCode: [''],
    name: [''],
    enrollmentYear: [''],
    rciApplication: [''],
    courseName: [''],
    contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  });
  id: number;
  getCenterStateData: any;
  setStateCode: any;
  getCenterData: any;
  formSubmitStatus = false;
  setCenterCode: any;
  urlPrefix: any;
  allCourses: any;
  courseName: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private activatedRoutes: ActivatedRoute
  ) {
    this.id = this.activatedRoutes.snapshot.params['id'];
    this.urlPrefix = this.activatedRoutes.snapshot.url[0].path;
  }

  ngOnInit(): void {
    document.body.classList.add('app-loader');
    if(this.urlPrefix === 'candidate' && this.id) {
      this.getDetails();
      this.getAllCourse();
    } else if(this.urlPrefix === 'coordinator' && this.id) {
      this.updateCandidateRegisterForm = this.formBuilder.group({
        stateCode: [''],
        centerCode: [''],
        name: [''],
        email: [''],
        userName: [''],
        contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
      });
      this.getCoordinatorDetails();
    }
  }

  getDetails() {
    this.commonService.getSelectedCandidateDetails(this.id).subscribe((res)=>{
      if(res.Status === 1) {
        this.setDetails(res.Data);
      } else {
        this.commonService.openErrorDialog("Something went wrong!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('app-loader');
      })
    })
  }

  getCoordinatorDetails() {
    this.commonService.getSelectedCoordinatorDetails(this.id).subscribe((res)=>{
      if(res.Status === 1) {
        this.setCoordinateDetails(res.Data);
      } else {
        this.commonService.openErrorDialog("Something went wrong!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('app-loader');
      })
    })
  }

  getAllCourse() {
    this.commonService.getAllCourses().subscribe((res)=>{
      if(res) {
        if(res.Status === 1) {
          this.allCourses = res.Data;
          console.log(this.courseName);
          this.updateCandidateRegisterForm.controls['courseName'].setValue(this.courseName)
        }
      }
    }, (err)=>{
      console.log(err);
    })
  }

  setDetails(data: any) {
    this.updateCandidateRegisterForm.controls['name'].setValue(data.FirstName)
    this.updateCandidateRegisterForm.controls['enrollmentYear'].setValue(data.Annual_Year)
    this.updateCandidateRegisterForm.controls['rciApplication'].setValue(data.RCI_application)
    this.updateCandidateRegisterForm.controls['stateCode'].setValue(data.StateCode)
    this.setStateCode = data.StateCode;
    this.updateCandidateRegisterForm.controls['centerCode'].setValue(data.CentreCode)
    this.setCenterCode = data.CentreCode;
    this.updateCandidateRegisterForm.controls['courseName'].setValue(data.CourseName)
    this.courseName = data.CourseFor;
  }

  setCoordinateDetails(data: any) {
    console.log(data)
    this.updateCandidateRegisterForm.controls['name'].setValue(data.FirstName)
    this.updateCandidateRegisterForm.controls['userName'].setValue(data.UserName)
    this.updateCandidateRegisterForm.controls['email'].setValue(data.Email)
    this.updateCandidateRegisterForm.controls['stateCode'].setValue(data.StateCode)
    this.setStateCode = data.StateCode;
    this.updateCandidateRegisterForm.controls['centerCode'].setValue(data.CentreCode)
    this.updateCandidateRegisterForm.controls['contactNumber'].setValue(data.ContactNumber)
    this.setCenterCode = data.CentreCode;
  }

  updateRegisterCandidate() {
    this.formSubmitStatus = true;
    if (this.updateCandidateRegisterForm.invalid) {
      this.formSubmitStatus = false;
      return;
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to save this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!'
      }).then((result: any) => {
          if(result.value) {
            this.formSubmit();
        }
      })
      this.formSubmitStatus = false;
    }
  }

  formSubmit() {
    if(this.urlPrefix !== 'coordinator') {
      console.log(this.updateCandidateRegisterForm)
      this.commonService.updateCandidateRegistration(this.updateCandidateRegisterForm, this.id).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            this.commonService.openErrorDialog("Saved successfully!!");
            this.router.navigate(['../dashboard/candidate-list/']);
          } else {
            this.commonService.openErrorDialog("Something went wrong!!");  
          }
        } else {
          this.commonService.openErrorDialog("Something went wrong!!");
        }
        this.formSubmitStatus = false;
      }, (err) => {
        console.log(err);
        this.formSubmitStatus = false;
        this.commonService.openErrorDialog("Something went wrong, Try again!!");
      })
    } else {
      this.commonService.updateCoordinatorRegistration(this.updateCandidateRegisterForm, this.id).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            this.commonService.openErrorDialog("Saved successfully!!");
            this.router.navigate(['../dashboard/coordinate-list/']);
          } else {
            this.commonService.openErrorDialog("Something went wrong!!");  
          }
        } else {
          this.commonService.openErrorDialog("Something went wrong!!");
        }
        this.formSubmitStatus = false;
      }, (err) => {
        console.log(err);
        this.formSubmitStatus = false;
        this.commonService.openErrorDialog("Something went wrong, Try again!!");
      })
    }
  }

}
