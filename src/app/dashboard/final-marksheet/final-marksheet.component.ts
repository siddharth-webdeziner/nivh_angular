import { Component, OnInit } from '@angular/core';
import { centerId } from 'src/app/core/centerId';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-final-marksheet',
  templateUrl: './final-marksheet.component.html',
  styleUrls: ['./final-marksheet.component.scss']
})
export class FinalMarksheetComponent implements OnInit {
  loggedInUser: any;
  theoryListArr: any;
  paperArr: any;
  theoryMaxmarks = 0;
  theoryMarksObtained = 0;
  practicalMaxmarks = 0;
  practicalMarksObtained = 0;
  academicSession = 2;
  courseName = null;
  center = null;
  year = 'first year';
  getCourse: any;
  centerArr: any;
  candidateList = null;
  candidateArr: any;
  centerName: any;

  constructor(
    private commonService: CommonService,
  ) {
    this.loggedInUser = this.commonService.getLoginData();
  }

  ngOnInit(): void {
    this.getCenterList();
    this.getCourse = centerId;
    if(this.loggedInUser.CandidateId) {
      this.getData();
    }
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

  getRequiredData() {
    let data = {
      course: this.courseName,
      academicSession: '2',
      year: 'second year',
      theoryPractical: 'practical',
      centerId: this.center
    }
    if((this.center && this.courseName) || (this.loggedInUser.CourseId && this.loggedInUser.CenterId)) {
      this.commonService.getExaminationpaperByCourse(data).subscribe((res)=>{
        if(res) {
          this.candidateArr = res.Data.Candidates;
          console.log(this.candidateArr)
        } else {
          this.commonService.openErrorDialog("Wrong name or password!!");
        }
        setTimeout(()=>{
          document.body.classList.remove('display-loader');
        })
      })
    }
  }

  getTotalMarks(externalMarks: any, internalMarks: any) {
    externalMarks = externalMarks >= 0 ? externalMarks : 0;
    internalMarks = internalMarks >= 0 ? internalMarks : 0;
    if(externalMarks + internalMarks < 0) {
      return 'A'
    }
    return externalMarks + internalMarks;
  }

  getMarks(marks: any) {
    if(marks < 0) {
      return 'A'
    }
    return marks;
  }

  getData() {
    let data = {
      course: this.courseName ? this.courseName : this.loggedInUser.CourseId,
      academicSession: '2',
      year: 'second year',
      centerId: this.center ? this.center : this.loggedInUser.CenterId,
      candidateId: this.candidateList ? this.candidateList : this.loggedInUser.CandidateId
    }
    // console.log(data)
    this.commonService.getAllMarksSheet(data).subscribe((res)=>{
      if(res) {
        this.theoryListArr = res.Data[0];
        console.log('this.theoryListArr', this.theoryListArr)
        this.getTheoryCount(this.theoryListArr.TheoryCandidates.PaperMarks);
        this.getPracticalCount(this.theoryListArr.PracticalCandidates.PaperMarks);
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

  getTheoryCount(theoryCandidate: any) {
    theoryCandidate.forEach((element: any) => {
      this.theoryMaxmarks = this.theoryMaxmarks + (element.MaxExternalMarks >= 0 ? element.MaxExternalMarks : 0) + (element.MaxInternalMarks >= 0 ? element.MaxInternalMarks : 0);
      this.theoryMarksObtained = this.theoryMarksObtained + (element.ExternalMarks >= 0 ? element.ExternalMarks : 0) + (element.InternalMarks >= 0 ? element.InternalMarks : 0);
    });
  }

  getPracticalCount(practicalCandidate: any) {
    practicalCandidate.forEach((element: any) => {
      this.practicalMaxmarks = this.theoryMaxmarks + (element.MaxExternalMarks >= 0 ? element.MaxExternalMarks : 0) + (element.MaxInternalMarks >= 0 ? element.MaxInternalMarks : 0);
      this.practicalMarksObtained = this.practicalMarksObtained + (element.ExternalMarks >= 0 ? element.ExternalMarks : 0) + (element.InternalMarks >= 0 ? element.InternalMarks : 0);
    });
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

}
