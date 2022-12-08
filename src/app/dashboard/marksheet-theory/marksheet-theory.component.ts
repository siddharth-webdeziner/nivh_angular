import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { centerId } from 'src/app/core/centerId';
import { NgStyle } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-marksheet-theory',
  templateUrl: './marksheet-theory.component.html',
  styleUrls: ['./marksheet-theory.component.scss']
})
export class MarksheetTheoryComponent implements OnInit {
  academicSession = 2;
  getCenterStateData: any;
  courseName = null;
  getCourse: any;
  getCenterBranch: any;
  center = null;
  year = 'first year';
  centerArr: any;
  paperArr: any;
  loggedInUser: any;
  theoryPractical: any;
  candidateArr: any;
  centerName: any;
  response: any;
  
  constructor(
    private commonService: CommonService,
    private activatedRoutes: ActivatedRoute,
  ) {
    this.loggedInUser = this.commonService.getLoginData();
    this.theoryPractical = this.activatedRoutes.snapshot.routeConfig?.path?.split("-")[1] ? 
                           this.activatedRoutes.snapshot.routeConfig?.path?.split("-")[1] : 'both';
    // console.log(this.theoryPractical)
  }

  ngOnInit(): void {
    this.getCenterList();
    this.getCourse = centerId;
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

  getPaperCount() {
    // console.log(this.theoryPractical)
    if(this.theoryPractical === 'both') {
      console.log("innnnnnnnnnnnnnnnnn")
      this.getFinalRequiredData();
    } else {
      console.log("innnnnnnnnnnnnnnnnn222222")
      this.getRequiredData();
    }
  }

  getFinalRequiredData() {
    console.log('nn')
    let data1 = {
      course: this.courseName,
      academicSession: '2',
      year: 'second year',
      theoryPractical: 'theory',
      centerId: this.center
    }
    let data2 = {
      course: this.courseName,
      academicSession: '2',
      year: 'second year',
      theoryPractical: 'practical',
      centerId: this.center
    }
    forkJoin(this.commonService.getExaminationpaperByCourse(data1), 
    this.commonService.getExaminationpaperByCourse(data2))
     .subscribe((result) => {
      console.log('result', result)
      this.response = result;
     })
  }
  
  getRequiredData(){
    let data;
    if(this.loggedInUser.UserRoleId === 2) {
      data = {
        course: this.loggedInUser.CourseName,
        academicSession: '2',
        year: 'second year',
        theoryPractical: this.theoryPractical,
        centerId: this.loggedInUser.CenterId
      }
    } else {
      data = {
        course: this.courseName,
        academicSession: '2',
        year: 'second year',
        theoryPractical: this.theoryPractical,
        centerId: this.center
      }
    }
    if((this.center && this.courseName) || (this.loggedInUser.CourseId && this.loggedInUser.CenterId)) {
      this.commonService.getExaminationpaperByCourse(data).subscribe((res)=>{
        if(res) {
          this.paperArr = res.Data.PaperList;
          this.candidateArr = res.Data.Candidates;
          this.centerArr.forEach((element: any) => {
            if(element['CentreId'].toString() === this.center) {
              this.centerName = element.ExaminationCenter;
            }
          });
        } else {
          this.commonService.openErrorDialog("Wrong name or password!!");
        }
        setTimeout(()=>{
          document.body.classList.remove('display-loader');
        })
      })
    }
  }

  downloadPdf() {
    let prtContent = document.getElementById("download");
    let WinPrint;
    if(prtContent) {
      WinPrint = window.open();
      if(WinPrint) {
        WinPrint.document.write(prtContent.innerHTML);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
      }
    }
  }

  totalMarks(internalMarks: any, externalMarks: any) {
    let totalMarksCount;
    if((internalMarks + externalMarks) < 0) {
      totalMarksCount = 'A';
    }
    if(internalMarks === 0 || externalMarks === 0) {
      totalMarksCount = internalMarks+externalMarks;
    }
    if(totalMarksCount < 0) {
      totalMarksCount = 0;
    }
    if(internalMarks < 0 && externalMarks > 0) {
      internalMarks = 0;
      totalMarksCount = internalMarks + externalMarks;
    }
    if(internalMarks > 0 && externalMarks < 0) {
      externalMarks = 0;
      totalMarksCount = internalMarks + externalMarks;
    }
    return totalMarksCount;
  }

}
