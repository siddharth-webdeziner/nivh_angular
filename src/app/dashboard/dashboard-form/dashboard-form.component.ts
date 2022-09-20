import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit {
  candidateRegisterForm: FormGroup = this.formBuilder.group({
    stateCode: [null],
    centerCode: [null],
    name: [''],
    enrolmentYear: ['2021-2023'],
    rciApplication: [''],
    courseName: ['']
  });
  formSubmitStatus = false;
  getCenterStateData: any;
  setStateCode: any;
  getCenterData: any;
  registrationType: any;
  allCourses: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private activatedRoutes: ActivatedRoute
  ) {
    this.registrationType = this.activatedRoutes.snapshot.url[0].path;
  }

  ngOnInit(): void {
    if(this.registrationType === 'coordinator') {
      this.candidateRegisterForm = this.formBuilder.group({
        stateCode: [null],
        centerCode: [null],
        name: [''],
        email: [''],
        password: [''],
        role: [2],
        userName: [''],
        contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
      });
    } else {
      this.getAllCourse();
    }
    this.getCenterState();
  }

  getAllCourse() {
    const defaultCoursename = '1';
    this.commonService.getAllCourses().subscribe((res)=>{
      if(res) {
        if(res.Status === 1) {
          this.allCourses = res.Data;
          this.candidateRegisterForm.controls['courseName'].setValue(defaultCoursename, {onlySelf: true})
        }
      }
    }, (err)=>{
      console.log(err);
    })
  }

  getCenterState() {
    this.commonService.getStateCode().subscribe((res)=>{
      if(res) {
        if(res.Status === 1) {
          this.getCenterStateData = res.Data;
        } else {
          this.commonService.openErrorDialog("Something went wrong, Try again!!");  
        }
      } else {
        this.commonService.openErrorDialog("Something went wrong, Try again!!");
      }
    }, (err)=>{
      console.log(err);
      this.commonService.openErrorDialog("Something went wrong, Try again!!");
    })
  }

  getCenterCode() {
    this.setStateCode = this.candidateRegisterForm.value.stateCode;
    this.commonService.getCenterCode(this.setStateCode).subscribe((res)=>{
      if(res) {
        if(res.Status === 1) {
          this.getCenterData = res.Data;
        } else {
          this.commonService.openErrorDialog("Something went wrong, Try again!!");  
        }
      } else {
        this.commonService.openErrorDialog("Something went wrong, Try again!!");
      }
    }, (err)=>{
      console.log(err);
      this.commonService.openErrorDialog("Something went wrong, Try again!!");
    })
  }

  registerCandidate() {
    this.formSubmitStatus = true;
    if (this.candidateRegisterForm.invalid) {
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
    if(this.registrationType === 'candidate') {
      this.commonService.candidateRegistrationForm(this.candidateRegisterForm).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            this.commonService.openSuccessDialog("Candidate registered!!");
            this.candidateRegisterForm.reset();
            // this.router.navigate(['../dashboard/candidate-list/']);
          } else {
            this.commonService.openErrorDialog(res.Message);  
          }
        } else {
          this.commonService.openErrorDialog(res.Message);
        }
        this.formSubmitStatus = false;
      }, (err)=> {
        console.log(err);
        this.formSubmitStatus = false;
        this.commonService.openErrorDialog("Something went wrong, Try again!!");
      })
    } else {
      this.commonService.coordinatorRegistrationForm(this.candidateRegisterForm).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            this.commonService.openSuccessDialog("Co-ordinator registered!!");
            this.candidateRegisterForm.reset();
            this.router.navigate(['../dashboard/coordinate-list/']);
          } else {
            this.commonService.openErrorDialog(res.Message);  
          }
        } else {
          this.commonService.openErrorDialog(res.Message);
        }
        this.formSubmitStatus = false;
      }, (err)=> {
        console.log(err);
        this.formSubmitStatus = false;
        this.commonService.openErrorDialog(err.Message);
      })
    }
  }
  

}
