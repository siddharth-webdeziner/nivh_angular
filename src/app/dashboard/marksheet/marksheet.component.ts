import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  marksForm: FormGroup = this.formBuilder.group({
    paper_marks0: [''],
    paper_marks1: [''],
    paper_marks2: [''],
    paper_marks3: [''],
    paper_marks4: [''],
  });
  candidateId: any;

  constructor(
    private commonService: CommonService,
    private activatedRoutes: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.theoryPractical =  this.activatedRoutes.snapshot.routeConfig?.path?.split("-")[1];
  }

  ngOnInit(): void {
    this.getCenterList();
    this.getCourse = centerId;
  }

  setDetails(candidateDetails: any) {
    candidateDetails.PaperMarks.forEach((element: any, index: any) => {
      this.marksForm.controls['paper_marks'+index].setValue(element.InternalMarks)
    });
  }

  getTimesheetList(courseName: any) {
    console.log('courseName', courseName);
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

  selectCenter(centerId: any) {
    this.commonService.getCandidateById(centerId).subscribe((res)=>{
      if(res) {
        this.candidateArr = res.Data;
      } else {
        this.commonService.openErrorDialog("Wrong name or password!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

  getPaperCount() {
    const data = {
      course: this.courseName,
      academicSession: '2',
      year: 'first year',
      theoryPractical: this.theoryPractical,
      centerId: this.center
    }
    if(this.center && this.courseName) {
      this.commonService.getExaminationpaperByCourse(data).subscribe((res)=>{
        if(res) {
          this.paperArr = res.Data.PaperList;
          this.candidateArr = res.Data.Candidates;
          console.log("this.candidateArr", this.candidateArr)
          console.log("this.paperArr", res)
          this.updateFormGroup(this.paperArr.length);
        } else {
          this.commonService.openErrorDialog("Wrong name or password!!");
        }
        setTimeout(()=>{
          document.body.classList.remove('display-loader');
        })
      })
    }
  }

  updateFormGroup(length: number) {
    if(length === 5) {
      this.marksForm = this.formBuilder.group({
        paper_marks0: [''],
        paper_marks1: [''],
        paper_marks2: [''],
        paper_marks3: [''],
        paper_marks4: [''],
      });
    } else {
      this.marksForm = this.formBuilder.group({
        paper_marks0: [''],
        paper_marks1: [''],
        paper_marks2: [''],
        paper_marks3: [''],
        paper_marks4: [''],
        paper_marks5: [''],
        paper_marks6: [''],
        paper_marks7: [''],
        paper_marks8: [''],
        paper_marks9: [''],
      });
    }
  }

  updateMarks(candidateData: any) {
    console.log(candidateData);
    this.candidateId = candidateData.candidateId;
    this.setDetails(candidateData);
  }

  creatingArr(element: any, paperMarks: any) {
    const newArr = [{
      PaperId: element.ExaminationPaperId,
      TotalMarks: element.TotalMarks,
      MarksType: "Internal",
      InternalMarks: paperMarks
    }]
  }

  savePaperMarks(id: any) {
    let data: any;
    if(this.paperArr.length === 10) {
      data = {
        CandidateId: id,
        CentreId: this.center,
        AcademicYearId: this.academicSession,
        YearOf: this.year,
        Papers: [
          {
            PaperId: this.paperArr[0].ExaminationPaperId,
            TotalMarks: this.paperArr[0].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks0
          },
          {
            PaperId: this.paperArr[1].ExaminationPaperId,
            TotalMarks: this.paperArr[1].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks1
          },
          {
            PaperId: this.paperArr[2].ExaminationPaperId,
            TotalMarks: this.paperArr[2].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks2
          },
          {
            PaperId: this.paperArr[3].ExaminationPaperId,
            TotalMarks: this.paperArr[3].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks3
          },
          {
            PaperId: this.paperArr[4].ExaminationPaperId,
            TotalMarks: this.paperArr[4].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks4
          },
          {
            PaperId: this.paperArr[5].ExaminationPaperId,
            TotalMarks: this.paperArr[5].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks5
          },
          {
            PaperId: this.paperArr[6].ExaminationPaperId,
            TotalMarks: this.paperArr[6].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks6
          },
          {
            PaperId: this.paperArr[7].ExaminationPaperId,
            TotalMarks: this.paperArr[7].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks7
          },
          {
            PaperId: this.paperArr[8].ExaminationPaperId,
            TotalMarks: this.paperArr[8].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks8
          },
          {
            PaperId: this.paperArr[9].ExaminationPaperId,
            TotalMarks: this.paperArr[9].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks9
          }
        ]
      }
    } else if(this.paperArr.length === 6) {
      data = {
        CandidateId: id,
        CentreId: this.center,
        AcademicYearId: this.academicSession,
        YearOf: this.year,
        Papers: [
          {
            PaperId: this.paperArr[0].ExaminationPaperId,
            TotalMarks: this.paperArr[0].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks0
          },
          {
            PaperId: this.paperArr[1].ExaminationPaperId,
            TotalMarks: this.paperArr[1].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks1
          },
          {
            PaperId: this.paperArr[2].ExaminationPaperId,
            TotalMarks: this.paperArr[2].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks2
          },
          {
            PaperId: this.paperArr[3].ExaminationPaperId,
            TotalMarks: this.paperArr[3].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks3
          },
          {
            PaperId: this.paperArr[4].ExaminationPaperId,
            TotalMarks: this.paperArr[4].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks4
          },
          {
            PaperId: this.paperArr[5].ExaminationPaperId,
            TotalMarks: this.paperArr[5].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks5
          }
        ]
      }
    } else {
      data = {
        CandidateId: id,
        CentreId: this.center,
        AcademicYearId: this.academicSession,
        YearOf: this.year,
        Papers: [
          {
            PaperId: this.paperArr[0].ExaminationPaperId,
            TotalMarks: this.paperArr[0].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks0
          },
          {
            PaperId: this.paperArr[1].ExaminationPaperId,
            TotalMarks: this.paperArr[1].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks1
          },
          {
            PaperId: this.paperArr[2].ExaminationPaperId,
            TotalMarks: this.paperArr[2].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks2
          },
          {
            PaperId: this.paperArr[3].ExaminationPaperId,
            TotalMarks: this.paperArr[3].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks3
          },
          {
            PaperId: this.paperArr[4].ExaminationPaperId,
            TotalMarks: this.paperArr[4].TotalMarks,
            MarksType: "Internal",
            InternalMarks: this.marksForm.value.paper_marks4
          }
        ]
      }
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
