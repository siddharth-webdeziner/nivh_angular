import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-total-final-statement',
  templateUrl: './total-final-statement.component.html',
  styleUrls: ['./total-final-statement.component.scss']
})
export class TotalFinalStatementComponent implements OnInit {
  loggedInUser: any;
  @Input() response: any;

  constructor(
    private commonService: CommonService,
  ) {
    this.loggedInUser = this.commonService.getLoginData();
    console.log('this.response', this.response);
  }
  
  ngOnInit(): void {
  }

}
