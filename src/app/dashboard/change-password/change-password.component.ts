import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = this.formBuilder.group({
    changePassword: [''],
    confirmPassword: ['']
  });
  formSubmitStatus = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  changePassword() {
    this.formSubmitStatus = true;
    console.log(this.changePasswordForm);
    if(this.formSubmitStatus && this.changePasswordForm.status === 'VALID') {
      this.router.navigate(['/dashboard']);
    }
  }

}
