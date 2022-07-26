import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { centerId } from 'src/app/core/centerId';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-marksheet',
  templateUrl: './marksheet.component.html',
  styleUrls: ['./marksheet.component.scss']
})
export class MarksheetComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  candidateArr: any;
  academicSession = 2;
  getCenterStateData: any;
  courseName = null;
  getCourse: any;
  getCenterBranch: any;
  center = null;
  year = 'first year';
  centerArr: any;
  paperArr: any;
  theoryPractical: any;
  marksForm: FormGroup;
  candidateId: any;
  paperOptions: Array<any> = []
  papers: FormArray | undefined;
  marksUpdated: FormArray | undefined;
  paper_marks: FormArray | undefined;
  marksUpdateForm: FormGroup;
  paperMarksArr: Array<any> = [];
  paperArrayIndex: any;
  loggedInUser: any;

  constructor(
    private commonService: CommonService,
    private activatedRoutes: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.loggedInUser = this.commonService.getLoginData();
    this.theoryPractical =  this.activatedRoutes.snapshot.routeConfig?.path?.split("-")[1];
    this.marksForm = this.formBuilder.group({
      papers: this.formBuilder.array([])
    });
    this.marksUpdateForm = this.formBuilder.group({
      updatedMarks: this.formBuilder.array([])
    })
    if(this.loggedInUser.UserRoleId === 2) {
      this.getPaperCount();
    }
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
    this.papers?.clear()
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
          this.updateFormGroup(res.Data);
        } else {
          this.commonService.openErrorDialog("Wrong name or password!!");
        }
        setTimeout(()=>{
          document.body.classList.remove('display-loader');
        })
      })
    }
  }

  updatePaperMarks(paper: any) {
    let paper_marks1: any[] = [];
    this.paper_marks = this.marksForm.controls['papers'].get('paper_marks') as FormArray;
    paper.PaperMarks.forEach((element: any) => {
      const getPaper = this.addPaperMarks(element);
      // console.log("getPaper", getPaper)
      paper_marks1?.push(getPaper.value);
    });
    this.paper_marks = <any>paper_marks1;
    // console.log('this.paper_marks', this.paper_marks);
    return this.paper_marks;
  }

  addPaperMarks(arr: any) {
    return this.formBuilder.group({
      marks: [arr.InternalMarks ? arr.InternalMarks : 0],
      externalMarks: [arr.ExternalMarks ? arr.ExternalMarks : 0]
  })
  }

  updateFormGroup(candidateArr: any) {
    this.papers = this.marksForm.controls['papers'] as FormArray;
    candidateArr.Candidates.forEach((element: any) => {
      this.papers?.push(this.addControls(element));
    });
  }

  updatePopupFormGroup(marksArr: any) {
    this.marksUpdated?.clear();
    // console.log('marksArr', marksArr)
    this.marksUpdated = this.marksUpdateForm.controls['updatedMarks'] as FormArray;
    marksArr.forEach((element: any) => {
      this.marksUpdated?.push(this.addMarksControls(element));
    });
    // console.log("this.marksUpdated", this.marksUpdated);
  }

  addMarksControls(arr: any) {
    // console.log('???', arr.InternalMarks)
    return this.formBuilder.group({
      updatedMarks: [arr.InternalMarks ? arr.InternalMarks : 0],
      updatedExtMarks: [arr.ExternalMarks ? arr.ExternalMarks : 0]
    })
  }
  
  addControls(arr: any) {
    return this.formBuilder.group({
        candidateName: [arr.firstName],
        enrollmentNumber: [arr.enrollmentNumber],
        candidate_id: [arr.candidateId ? arr.candidateId : ''],
        paper_marks: [this.updatePaperMarks(arr)]
    })
  }

  updateMarks(i: any) {
    this.paperArrayIndex = i;
    this.paperMarksArr = [];
    // console.log('can', i)
    // console.log(this.candidateArr.length)
    this.candidateArr.forEach((element: any) => {
      // console.log(element.PaperMarks[i])
      this.paperMarksArr.push(element.PaperMarks[i])
    });
    this.updatePopupFormGroup(this.paperMarksArr)
  }
  
  savePaperMarks() {
    let data: any;
    let candidateMarksArr: any[] = [];
    this.marksForm.value.papers.forEach((element: any, index: number) => {
      let myObj = {
        CandidateIds: element.candidate_id,
        InternalMarks: this.marksUpdateForm.value.updatedMarks[index].updatedMarks,
        ExternalMarks: this.marksUpdateForm.value.updatedMarks[index].updatedExtMarks
      }
      candidateMarksArr.push(myObj)
    });
    data = {
      Papers: [
        {
          CentreId: this.loggedInUser.UserRoleId === 2 ? this.loggedInUser.CenterId : this.center,
          AcademicYearId: this.academicSession,
          YearOf: this.year,
          MarksType: this.theoryPractical,
          PaperId: this.paperArr[this.paperArrayIndex].ExaminationPaperId,
          CandidateIds: candidateMarksArr
        }
      ]
    }
    console.log(data)
    this.commonService.saveCandidateMarks(data).subscribe((res)=>{
      if(res) {
          console.log(res);
        this.getPaperCount();
        this.closebutton.nativeElement.click();
      } else {
        this.commonService.openErrorDialog("Wrong name or password!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

}
