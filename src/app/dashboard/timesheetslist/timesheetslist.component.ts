import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-timesheetslist',
  templateUrl: './timesheetslist.component.html',
  styleUrls: ['./timesheetslist.component.scss']
})
export class TimesheetslistComponent implements OnInit {
  timesheetArr:any;
  selectedStateOption: any;
  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.selectedStateOption = 1;
    this.getTimesheetList(this.selectedStateOption);
  }

  getCenterCode() {
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

  deleteRecord(id: any, index: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: any) => {
      if(result.value) {
        this.commonService.deleteTimesheetRecord(id).subscribe((res)=>{
          if(res.Status === 1) {
            this.commonService.openSuccessDialog("Record Deleted!!");
            this.timesheetArr.splice(index, 1);
          } else {
            this.commonService.openErrorDialog(res.Message);
          }
        })
      }
    })
  }

}
