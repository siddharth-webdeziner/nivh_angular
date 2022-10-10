import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addexaminationcenter',
  templateUrl: './addexaminationcenter.component.html',
  styleUrls: ['./addexaminationcenter.component.scss']
})
export class AddexaminationcenterComponent implements OnInit {
  addExaminationCenterForm: FormGroup = this.formBuilder.group({
    center: [null],
    examCenter: ['']
  })
  formSubmitStatus = false;
  getCenterBranch: any;
  constructor(
    private formBuilder: FormBuilder,
    private commonService:CommonService
  ) { }

  ngOnInit(): void {
    this.getCenterList();
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
        this.getCenterBranch = res.Data.Items;
      } else {
        this.commonService.openErrorDialog("Wrong name or password!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

  addExaminationCenter() {
    this.formSubmitStatus = true;
    if (this.addExaminationCenterForm.invalid) {
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
    this.commonService.saveExaminationCenterForm(this.addExaminationCenterForm).subscribe((res)=>{
      if(res) {
        if(res.Status === 1) {
          this.commonService.openSuccessDialog("Examination center added successfully!!");
          this.addExaminationCenterForm.reset();
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
    }, (err)=> {
      console.log(err);
      this.formSubmitStatus = false;
      this.commonService.openErrorDialog(err.Message);
    })
  }
}
