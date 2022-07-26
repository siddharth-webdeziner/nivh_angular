import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import Swal from 'sweetalert2';
import { centerId } from '../../core/centerId';

@Component({
  selector: 'app-center-form',
  templateUrl: './center-form.component.html',
  styleUrls: ['./center-form.component.scss']
})
export class CenterFormComponent implements OnInit {
  centerForm: FormGroup = this.formBuilder.group({
    centerName: [''],
    stateCode: [''],
    centerState: [''],
    centerCode: [null],
    cAddress: [''],
    centerBranch:[null]
  });
  getCenterBranch = centerId
  formSubmitStatus = false;
  getCenterData: any;
  centerId: any;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private activatedRoutes: ActivatedRoute
  ) {
    this.centerId = this.activatedRoutes.snapshot.params['id'];
    this.centerForm.controls['centerBranch'].setValue(1)
  }

  ngOnInit(): void {
    if(this.centerId) {
      document.body.classList.add('display-loader');
      this.getCenterDetails(this.centerId);
    }
    this.getCodeCode();
  }

  getCenterDetails(id: any) {
    this.commonService.getSelectedCenterDetails(id).subscribe((res)=>{
      if(res) {
        console.log(res.Data)
        this.setFormDetails(res.Data)
      } else {
        this.commonService.openErrorDialog("Something went wrong!!");
      }
      setTimeout(()=>{
        document.body.classList.remove('display-loader');
      })
    })
  }

  setFormDetails(data: any) {
    let optionsmatched = false;
    this.centerForm.controls['centerName'].setValue(data.CenterName);
    this.centerForm.controls['stateCode'].setValue(data.StateCode);
    this.centerForm.controls['centerState'].setValue(data.CenterState);
    this.centerForm.controls['centerCode'].setValue(data.CenterCode);
    this.centerForm.controls['cAddress'].setValue(data.CentreAddress);
  }

  getCodeCode() {
    let centerCodeArr = [];
    const centerBranch = this.centerForm.controls['centerBranch'].value;
    console.log('centerBranch', centerBranch)
    let count = 0;
    if(centerBranch == 2) {
      count = 10;
    } else if(centerBranch == 3) {
      count = 1;
    } else {
      count = 300;
    }
    for(let i = 1; i <= count; i++) {
      centerCodeArr.push(i);
    }
    this.getCenterData = centerCodeArr;
  }

  registerCenter() {
    this.formSubmitStatus = true;
    if (this.centerForm.invalid) {
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
    if(!this.centerId) {
      this.commonService.centerForm(this.centerForm).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            this.commonService.openSuccessDialog("Center added successfully!!");
            this.centerForm.reset();
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
    } else {
      this.commonService.updateCenterForm(this.centerForm, this.centerId).subscribe((res)=>{
        if(res) {
          if(res.Status === 1) {
            this.commonService.openSuccessDialog("Center updated successfully!!");
            this.centerForm.reset();
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

  changeBranch() {
    this.getCodeCode();    
  }

}
