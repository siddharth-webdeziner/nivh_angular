import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit {
  candidateRegisterForm: FormGroup = this.formBuilder.group({
    name: [''],
    enrolmentYear: [''],
    enrolmentNumber: [''],
    dob: ['']
  });
  formSubmitStatus = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  registerCandidate() {
    this.formSubmitStatus = true;
    if (this.candidateRegisterForm.invalid) {
      return;
    } else {
      this.commonService.candidateRegistrationForm(this.candidateRegisterForm).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            this.commonService.openErrorDialog("Data saved!!");
            this.candidateRegisterForm.reset();
          } else {
            this.commonService.openErrorDialog("Something went wrong, Try again!!");  
          }
        } else {
          this.commonService.openErrorDialog("Something went wrong, Try again!!");
        }
      })
    }
  }

}
