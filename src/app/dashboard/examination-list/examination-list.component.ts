import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.component.html',
  styleUrls: ['./examination-list.component.scss']
})
export class ExaminationListComponent implements OnInit {
  userDetails: any;
  candidateArr: any;
  selectedStateOption: any;
  selectedCenterOption: any;
  selectedYearOption: any;
  getCenterStateData: any;
  getCenterData: any;
  initialChange = false;
  listCategory: any;
  centerId: any;
  constructor(
    private commonService: CommonService,
    private activatedRoutes: ActivatedRoute
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('loginStatus') || '{}');
    this.listCategory = this.userDetails.UserRoleId === 1 ? 'Admin' : 'coordinator';
    console.log(this.userDetails)
    this.centerId = this.userDetails.CenterId;
  }

  ngOnInit(): void {
    this.selectedYearOption = '2021-2023';
    this.selectedCenterOption = null;
    this.selectedStateOption = null;
    if(this.listCategory !== 'coordinator') {
      this.getCenterState();
    } else {
      this.getExaminationList(false);
    }
  }

  filterCandidateList() {
    this.getExaminationList(true);
  }

  getCenterState() {
    this.commonService.getStateCode().subscribe((res)=>{
      if(res) {
        if(res.Status === 1) {
          this.getCenterStateData = res.Data;
          if(this.userDetails.UserRoleId === 1) {
            // this.selectedStateOption = res.Data[0].StateCode;
            if(this.selectedStateOption) {
              this.getCenterCode();
            }
          }
        }
      }
    }, (err)=>{
      console.log(err);
      this.commonService.openErrorDialog("Something went wrong, Try again!!");
    })
  }
  
  getCenterCode() {
    this.commonService.getCenterCode(this.selectedStateOption).subscribe((res)=>{
      if(res) {
        if(res.Status === 1) {
          this.getCenterData = res.Data;
          if(this.userDetails.UserRoleId === 1 && !this.initialChange) {
            // this.selectedCenterOption = res.Data[0].CenterCode;
            if(this.selectedCenterOption) {
              this.getExaminationList(true);
            }
            this.initialChange = true;
          }
        }
      }
    }, (err)=>{
      console.log(err);
      this.commonService.openErrorDialog("Something went wrong, Try again!!");
    })
  }

  getExaminationList(candidate: any) {
    document.body.classList.add('display-loader');
    let data;
    if(candidate) {
      data = {
          CandidateId: this.userDetails.CandidateId,
          PageNumber: 1,
          PageSize: 250,
          SortColumn: 'FirstName',
          CenterId: this.centerId,
          CentreCode: this.selectedCenterOption,
          StateCode: this.selectedStateOption,
          UserRoleId: 1
        }
    } else {
      data = {
        CandidateId: this.userDetails.CandidateId,
        PageNumber: 1,
        PageSize: 250,
        SortColumn: 'FirstName',
        CenterId: this.centerId
      }
    }
    // }
    this.commonService.getExaminationCandidateList(data).subscribe((res)=>{
      if(res.Status === 1) {
        console.log(res);
        this.candidateArr = res.Data.Items;
      } else {
        this.commonService.openErrorDialog("Something went wrong!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

  viewAdmitCard(id: any) {
    const url = `${environment.url.baseUrl}dashboard/admit-card/${id}`;
    window.open(url, '_blank');
  }

  verification(id: any) {
    const url = `${environment.url.baseUrl}dashboard/verify-admit-card/${id}`;
    window.open(url, '_blank');
  }

  viewDetails(id: any) {
      const url = `${environment.url.baseUrl}dashboard/examination-candidate-list-details/${id}`;
      window.open(url, '_blank');
  }

}
