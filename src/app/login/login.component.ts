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
  constructor(
    private router: Router,
    private activatedRoutes: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commonService: CommonService
    ) {
      this.source = this.activatedRoutes.snapshot.paramMap.get('type');
  }
    
  ngOnInit(): void {
  }

  navigateToDashboard() {
    this.formSubmitStatus = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.commonService.loginUser(this.loginForm).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            localStorage.setItem('loginStatus', 'loggedIn');
            this.router.navigate(['/dashboard']);
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
