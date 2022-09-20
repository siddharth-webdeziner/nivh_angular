import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  source: any;
  loginForm: FormGroup = this.formBuilder.group({
    name: [''],
    password: ['']
  });
  formSubmitStatus = false;
  userRoleId: any;
  centerName: any;
  loggedInUser: any;
  constructor(
    private router: Router,
    private activatedRoutes: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commonService: CommonService
    ) {
      this.loggedInUser = this.commonService.getLoginData();
      console.log('this.loggedInUser', this.loggedInUser);
      // if(this.loggedInUser) {
      //   this.router.navigate(['/dashboard'])
      // }
      this.source = this.activatedRoutes.snapshot.paramMap.get('type');
      if(this.source !== 'candidate') {
        this.userRoleId = (this.source === 'admin') ? 1 : 2
      } else {
        this.userRoleId = 4;
      }
  }
    
  ngOnInit(): void {
  }

  navigateToDashboard() {
    this.formSubmitStatus = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.commonService.loginUser(this.loginForm, this.userRoleId).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            localStorage.setItem('loginStatus', JSON.stringify(res.Data));
            this.router.navigate(['/dashboard']);
          } else {
            this.commonService.openErrorDialog("Wrong credentails!!");  
          }
        } else {
          this.commonService.openErrorDialog("Wrong credentails!!");
        }
        this.formSubmitStatus = false;
      }, (err)=> {
        console.log(err);
        this.formSubmitStatus = false;
        this.commonService.openErrorDialog("Something went wrong!!");
      })
    }
  }

  getCenterName() {
    if(this.loginForm.controls['name'].value) {
      this.commonService.loginUser(this.loginForm, this.userRoleId).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            this.loginForm.controls['password'].setValue(res.Data.CentreName);
          } else {
            this.commonService.openErrorDialog(res.Message);
            this.loginForm.controls['password'].setValue('');
          }
        } else {
          this.commonService.openErrorDialog(res.Message);
          this.loginForm.controls['password'].setValue('');
        }
        this.formSubmitStatus = false;
      }, (err)=> {
        console.log(err);
        this.formSubmitStatus = false;
        this.commonService.openErrorDialog("Something went wrong!!");
      })
    }
  }

}
