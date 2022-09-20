import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loggedInUser: any;
  constructor(
    private router: Router,
    private commonService: CommonService
  ) { 
    this.loggedInUser = this.commonService.getLoginData();
    if(!this.loggedInUser.UserId) {
      this.router.navigate(['/login/admin'])
    }
  }

  ngOnInit(): void {
  }

  loggedOut() {
    localStorage.removeItem('loginStatus');
    this.router.navigate(['/']);
  }
}
