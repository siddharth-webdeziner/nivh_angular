import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-candidate-listing',
  templateUrl: './candidate-listing.component.html',
  styleUrls: ['./candidate-listing.component.scss']
})
export class CandidateListingComponent implements OnInit {
  candidateId = 0;
  pageNumber = 1;
  pageSize = 15;
  sortColumn = 'FirstName';
  candidateArr: any;
  constructor(
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCandidateList();
  }

  getCandidateList() {
    const data = {
      CandidateId: this.candidateId,
      PageNumber: this.pageNumber,
      PageSize: this.pageSize,
      SortColumn: this.sortColumn
    }
    this.commonService.getCandidateList(data).subscribe((res)=>{
      if(res) {
        console.log(res.Data.Items)
        this.candidateArr = res.Data.Items;
      } else {
        this.commonService.openErrorDialog("Wrong name or password!!");
      }
    })
  }

}
