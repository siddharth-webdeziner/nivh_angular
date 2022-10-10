import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examinationform',
  templateUrl: './examinationform.component.html',
  styleUrls: ['./examinationform.component.scss']
})
export class ExaminationformComponent implements OnInit {
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
  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('loginStatus') || '{}');
    this.candidateId = this.userDetails.CandidateId;
  }

  ngOnInit(): void {
    this.examinationForm.controls['status'].setValue('0');
    this.examinationForm.controls['academicYear'].setValue('2');
    this.examinationForm.controls['year'].setValue('first');
    this.getexaminationForm();
  }

  getexaminationForm() {
    this.commonService.getExaminationFormDetails(this.candidateId).subscribe((res)=>{
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

  examinationFormSubmit() {
    this.formSubmitStatus = true;
    if (this.examinationForm.invalid) {
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
      this.commonService.examinationForm(this.examinationForm, this.candidateId,false).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            this.commonService.openSuccessDialog("Examination form submitted!!");
            this.examinationForm.reset();
            this.submitted = res.Data.IsSubmitted;
            // this.router.navigate(['../dashboard/center-list']);
          } else {
            if(res.Message) {
              this.commonService.openErrorDialog(res.Message);    
            } else {
              this.commonService.openErrorDialog("Something went wrong, Try again!!");  
            }
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
