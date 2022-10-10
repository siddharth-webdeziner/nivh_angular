import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import Swal from 'sweetalert2';
import { centerId } from '../../core/centerId';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.scss']
})
export class TimesheetsComponent implements OnInit {
  timesheetForm: FormGroup = this.formBuilder.group({
    paperId: [null],
    dateTime: [''],
    timing: [''],
    academicYear:[null],
    course: [null],
    session: [null]
  });
  formSubmitStatus = false;
  getExaminationPaper: any;
  practical = true;
  timesheetId: any;
  getCourseBranch: any;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private activatedRoutes: ActivatedRoute,
    private router: Router,
  ) {
    this.timesheetId = this.activatedRoutes.snapshot.params['id'];
    this.getCourseBranch = centerId;
  }

  ngOnInit(): void {
    this.timesheetForm.controls['academicYear'].setValue('2021-2023');
    this.timesheetForm.controls['course'].setValue(1);
    this.timesheetForm.controls['session'].setValue(0);
    this.getCourseList(this.practical)
  }

  getCourseList(event: any) {
    console.log(event)
    this.commonService.getCourseList(event).subscribe((res)=>{
      if(res) {
        console.log(res.Data)
        this.getExaminationPaper = res.Data;
      } else {
        this.commonService.openErrorDialog("Something went wrong!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

  addTimesheet() {
    this.formSubmitStatus = true;
    if (this.timesheetForm.invalid) {
      return;
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to save this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!'
      }).then((result: any) => {
          if(result.value) {
            this.formSubmit();
        }
      })
      this.formSubmitStatus = false;
    }
  }

  formSubmit() {
    console.log('this.timesheetId', this.timesheetForm)
    if(!this.timesheetId) {
      this.commonService.addTimesheet(this.timesheetForm).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            this.commonService.openSuccessDialog("Datesheet added successfully!!");
            this.timesheetForm.reset();
            // this.router.navigate(['../dashboard/center-list']);
          } else {
            if(res.Message) {
              this.commonService.openErrorDialog(res.Message);    
            } else {
              this.commonService.openErrorDialog("Something went wrong, Try again!!");  
            }
          }
        } else {
          this.commonService.openErrorDialog(res.Message);
        }
        this.formSubmitStatus = false;
      }, (err)=> {
        console.log(err);
        this.formSubmitStatus = false;
        this.commonService.openErrorDialog(err.Message);
      })
    } else {
      this.commonService.updateCenterForm(this.timesheetForm, this.timesheetId).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            this.commonService.openSuccessDialog("Center updated successfully!!");
            this.timesheetForm.reset();
            this.router.navigate(['../dashboard/center-list']);
          } else {
            if(res.Message) {
              this.commonService.openErrorDialog(res.Message);    
            } else {
              this.commonService.openErrorDialog("Something went wrong, Try again!!");  
            }
          }
        } else {
          this.commonService.openErrorDialog(res.Message);
        }
        this.formSubmitStatus = false;
      }, (err)=> {
        console.log(err);
        this.formSubmitStatus = false;
        this.commonService.openErrorDialog(err.Message);
      })
    }
  }

}
