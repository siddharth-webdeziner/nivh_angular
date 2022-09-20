import { Component, OnChanges, OnInit } from '@angular/core';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'nivh';
  loaderLoading: boolean = false;
  constructor(
    private commonService: CommonService
    ) {
      // this.commonService.bSubject.subscribe(value => {
      //   console.log("Subscription got", value);
      //   if(value) {
      //     this.loaderLoading = true;
      //   } else {
      //     this.loaderLoading = false;
      //   }
      // });
    }
    
    ngOnInit(): void {
      // this.commonService.bSubject.subscribe(value => {
        //   console.log("Subscription got", value);
        //   if(value) {
          //     this.loaderLoading = value;
          //   }
          // });
        }
        
        ngOnChanges() {
        }
}
