import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userDetails: any;
  userId: number | undefined;
  constructor( private router: Router, private activatedRoutes: ActivatedRoute) {
    console.log(this.activatedRoutes)
  }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.userId)
    if(this.userId) {
      // this.router.navigate(['/dashboard'])
      return true;
    } else {
      console.log('in')
      return this.router.navigate(['/'])
      // return false;
    }
  }
  
}
