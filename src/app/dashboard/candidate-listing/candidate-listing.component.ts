import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-candidate-listing',
  templateUrl: './candidate-listing.component.html',
  styleUrls: ['./candidate-listing.component.scss']
})
export class CandidateListingComponent implements OnInit {
  candidateId = 0;
  pageNumber = 1;
  pageSize = 250;
  sortColumn = 'FirstName';
  candidateArr: any;
  listCategory: any;
  UserRoleId = 2;
  centerId: any;
  getCenterStateData: any;
  getCenterData: any;
  centerCode: any;
  selectedStateOption: any;
  selectedCenterOption: any;
  userDetails: any;
  initialChange = false;
  selectedYearOption: any;
  constructor(
    private commonService: CommonService,
    private router: Router,
    private activatedRoutes: ActivatedRoute
  ) {
    this.listCategory = this.activatedRoutes.snapshot.url[0].path;
    this.userDetails = JSON.parse(localStorage.getItem('loginStatus') || '{}');
    this.centerId = this.userDetails.CenterId;
  }

  ngOnInit(): void {
    // document.body.classList.add('display-loader');
    this.selectedYearOption = '2021-2023';
    this.selectedCenterOption = null;
    this.selectedStateOption = null;
    if(this.listCategory !== 'coordinate-list') {
      this.getCenterState();
      if(this.userDetails.UserRoleId === 2) {
        this.getCandidateList();
      }
    } else {
      this.getCooridatorList();
    }
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
              this.getCandidateList();
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
  
  filterCandidateList() {
    this.getCandidateList();
  }
  
  getCandidateList() {
    document.body.classList.add('display-loader');
    let data;
    if(this.userDetails.UserRoleId === 1) {
      data = {
        CandidateId: this.candidateId,
        PageNumber: this.pageNumber,
        PageSize: this.pageSize,
        SortColumn: this.sortColumn,
        CenterId: this.centerId,
        CentreCode: this.selectedCenterOption,
        StateCode: this.selectedStateOption
      }
    } else {
      data = {
        CandidateId: this.candidateId,
        PageNumber: this.pageNumber,
        PageSize: this.pageSize,
        SortColumn: this.sortColumn,
        CenterId: this.centerId
      }
    }
    this.commonService.getCandidateList(data).subscribe((res)=>{
      if(res.Status === 1) {
        this.candidateArr = res.Data.Items;
      } else {
        this.commonService.openErrorDialog("Wrong name or password!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

  getCooridatorList() {
    const data = {
      UserRoleId: this.UserRoleId,
      PageSize: this.pageSize,
      SortColumn: this.sortColumn
    }
    this.commonService.getCoordinatorList(data).subscribe((res)=>{
      if(res) {
        this.candidateArr = res.Data.Items;
      } else {
        this.commonService.openErrorDialog("Wrong name or password!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

  deleteRecord(id: number, index: number, deleteSource?: any) {
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
        this.commonService.deleteRecord(id, deleteSource).subscribe((res)=>{
          if(res.Status === 1) {
            this.commonService.openSuccessDialog("Record Deleted!!");
            this.candidateArr.splice(index, 1);
            this.commonService.bSubject.next({})
          } else {
            this.commonService.openErrorDialog("Something went wrong!!");
          }
        })
      }
    })
  }

  viewDetails(id: any) {
      const url = `${environment.url.baseUrl}dashboard/candidate-details/${id}`;
      window.open(url, '_blank');
  }

  editDetails(id: any) {
    const url = `${environment.url.baseUrl}dashboard/update-form/${id}`;
    window.open(url, '_blank');
}

}
