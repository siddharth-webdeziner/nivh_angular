import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {
  candidateId: number;
  candidateDetails: any;
  loggedInUser: any;
  constructor(
    private activateRoutes: ActivatedRoute,
    private commonService: CommonService
  ) {
    this.candidateId = this.activateRoutes.snapshot.params['id'];
    this.loggedInUser = this.commonService.getLoginData();
  }

  ngOnInit(): void {
    document.body.classList.add('display-loader');
    
    this.getDetails();
  }

  getDetails(){
    this.commonService.getSelectedCandidateDetails(this.candidateId).subscribe((res)=>{
      if(res.Status === 1) {
        this.candidateDetails = res.Data;
        console.log(this.candidateDetails)
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
        this.candidateDetails = res.Data;
        console.log(this.candidateDetails)
        this.commonService.openSuccessDialog("Verified and forwarded to the NBER")
      } else {
        this.commonService.openErrorDialog(res.Message);
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

}
