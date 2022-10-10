import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-admitcard',
  templateUrl: './admitcard.component.html',
  styleUrls: ['./admitcard.component.scss']
})
export class AdmitcardComponent implements OnInit {
  examinationFormData: any;
  examinationForm: FormGroup = this.formBuilder.group({
    status: [null],
    academicYear: [null],
    year:[null]
  });
  submitted = false;
  formSubmitStatus = false;
  userDetails: any;
  candidateId: any;
  verification = false;
  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private activatedRoutes: ActivatedRoute
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('loginStatus') || '{}');
    this.candidateId =  this.activatedRoutes.snapshot.params['id'];
    console.log(this.activatedRoutes.snapshot.url[0].path)
    if(this.activatedRoutes.snapshot.url[0].path === 'verify-admit-card') {
      this.verification = true;
    }
  }

  ngOnInit(): void {
    this.examinationForm.controls['status'].setValue('0');
    this.examinationForm.controls['academicYear'].setValue('2');
    this.examinationForm.controls['year'].setValue('first');
    this.getexaminationForm();
  }

  getexaminationForm() {
    this.commonService.getAdmitCardByIdDetails(this.candidateId).subscribe((res)=>{
      if(res) {
        this.examinationFormData = res.Data;
      } else {
        this.commonService.openErrorDialog("Something went wrong!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

  downloadAdmitCard(url: any) {
    console.log('url', url)
    window.open(url)
  }
}
