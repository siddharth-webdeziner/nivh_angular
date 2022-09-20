import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedInUser: any;
  constructor(
    private router: Router,
    private commonService: CommonService
  ) {
    this.loggedInUser = this.commonService.getLoginData();
    console.log('this.loggedInUser', this.loggedInUser);
    if(this.loggedInUser.UserId) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
  }

  login(source: string) {
    this.router.navigate(['/login', source]);
  }

}
