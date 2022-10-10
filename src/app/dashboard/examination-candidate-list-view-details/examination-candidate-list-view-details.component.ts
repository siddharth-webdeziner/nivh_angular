import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examination-candidate-list-view-details',
  templateUrl: './examination-candidate-list-view-details.component.html',
  styleUrls: ['./examination-candidate-list-view-details.component.scss']
})
export class ExaminationCandidateListViewDetailsComponent implements OnInit {
  candidateId: number;
  examinationFormData: any;
  loggedInUser: any;
  formSubmitStatus = false;
  constructor(
    private activateRoutes: ActivatedRoute,
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) {
    this.candidateId = this.activateRoutes.snapshot.params['id'];
    this.loggedInUser = this.commonService.getLoginData();
  }

  ngOnInit(): void {
    document.body.classList.add('display-loader');
    
    this.getDetails();
  }

  getDetails(){
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

  verifyCandidate() {
    this.commonService.verifyCandidateDetails(this.candidateId).subscribe((res)=>{
      if(res.Status === 1) {
        this.examinationFormData = res.Data;
        console.log(this.examinationFormData)
        this.commonService.openSuccessDialog("Verified and forwarded to the NBER")
      } else {
        this.commonService.openErrorDialog(res.Message);
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

  examinationFormVerify() {
    this.formSubmitStatus = true;
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to verify this!",
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

  formSubmit() {
    const data = {};
    this.commonService.examinationForm(data, this.examinationFormData.ExaminationId, true).subscribe((res)=>{
      if(res) {
        if(res.Status === 1) {
          this.commonService.openSuccessDialog("Examination form verified!!");
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
