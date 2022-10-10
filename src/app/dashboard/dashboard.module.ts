import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateListingComponent } from './candidate-listing/candidate-listing.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { UpdateRegisterComponent } from './update-register/update-register.component';
import { UpdateCoordinatorComponent } from './update-coordinator/update-coordinator.component';
import { CenterFormComponent } from './center-form/center-form.component';
import { CenterListComponent } from './center-list/center-list.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { TimesheetslistComponent } from './timesheetslist/timesheetslist.component';
import { ExaminationformComponent } from './examinationform/examinationform.component';
import { ExaminationListComponent } from './examination-list/examination-list.component';
import { ExaminationCandidateListViewDetailsComponent } from './examination-candidate-list-view-details/examination-candidate-list-view-details.component';
import { AddexaminationcenterComponent } from './addexaminationcenter/addexaminationcenter.component';
import { AdmitcardComponent } from './admitcard/admitcard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardFormComponent,
    DashboardHomeComponent,
    ChangePasswordComponent,
    CandidateFormComponent,
    CandidateListingComponent,
    CandidateDetailsComponent,
    UpdateRegisterComponent,
    UpdateCoordinatorComponent,
    CenterFormComponent,
    CenterListComponent,
    TimesheetsComponent,
    TimesheetslistComponent,
    ExaminationformComponent,
    ExaminationListComponent,
    ExaminationCandidateListViewDetailsComponent,
    AddexaminationcenterComponent,
    AdmitcardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class DashboardModule { }
