import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-center-list',
  templateUrl: './center-list.component.html',
  styleUrls: ['./center-list.component.scss']
})
export class CenterListComponent implements OnInit {
  centerArr:any;
  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.getCenterList();
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
        this.commonService.deleteCenterRecord(id).subscribe((res)=>{
          if(res.Status === 1) {
            this.commonService.openSuccessDialog("Record Deleted!!");
            this.centerArr.splice(index, 1);
          } else {
            this.commonService.openErrorDialog(res.Message);
          }
        })
      }
    })
  }

}
