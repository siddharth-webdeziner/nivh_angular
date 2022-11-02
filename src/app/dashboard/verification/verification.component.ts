import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { centerId } from '../../core/centerId';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  centerName = null;
  courseName = 1;
  dateSheetList = null;
  centerArr: any;
  getCenterBranch = centerId;
  selectedStateOption: any;
  timesheetArr: any;
  filteredVerificationList: any;
  constructor(
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getCenterList();
    this.selectedStateOption = 1;
    // this.courseName = 1;
    this.getTimesheetList(this.selectedStateOption);
  }

  getTimesheetList(value: any) {
    this.commonService.getTimesheetList(value).subscribe((res)=>{
      if(res) {
        this.timesheetArr = res.Data;
      } else {
        this.commonService.openErrorDialog("Wrong name or password!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

  getCenterList() {
    const data = {
      PageSize: 250,
      SortColumn: 'CentreId',
      PageNumber: 1,
      SortDirection: 'asc'
    }
    this.commonService.getCenterList(data).subscribe((res)=>{
      if(res) {
        this.centerArr = res.Data.Items;
      } else {
        this.commonService.openErrorDialog("Wrong name or password!!");
      }
    })
  }

  filterVerificationList() {
    document.body.classList.add('display-loader');
    const data = {
      "SortColumn": "FirstName",
      "CenterId": this.centerName,
      "courseId": this.courseName,
      "DateSheetPaperId": this.dateSheetList

    }
    this.commonService.getVerificationList(data).subscribe((res)=>{
      if(res) {
        if(res.Status === 1) {
          this.filteredVerificationList = res.Data;
        }
      }
    }, (err)=>{
      console.log(err);
      this.commonService.openErrorDialog("Something went wrong, Try again!!");
    })
    document.body.classList.remove('display-loader');
  }

}
