import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationComponent } from './verification/verification.component';
import { AddexaminationcenterComponent } from './addexaminationcenter/addexaminationcenter.component';
import { AdmitcardComponent } from './admitcard/admitcard.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateListingComponent } from './candidate-listing/candidate-listing.component';
import { CenterFormComponent } from './center-form/center-form.component';
import { CenterListComponent } from './center-list/center-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardComponent } from './dashboard.component';
import { ExaminationCandidateListViewDetailsComponent } from './examination-candidate-list-view-details/examination-candidate-list-view-details.component';
import { ExaminationListComponent } from './examination-list/examination-list.component';
import { ExaminationformComponent } from './examinationform/examinationform.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { TimesheetslistComponent } from './timesheetslist/timesheetslist.component';
import { UpdateRegisterComponent } from './update-register/update-register.component';
import { MarksheetComponent } from './marksheet/marksheet.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, children: [
        { path: '', component: DashboardHomeComponent },
        { path: 'candidate/register', component: DashboardFormComponent },
        { path: 'coordinator/register', component: DashboardFormComponent },
        { path: 'change-password', component: ChangePasswordComponent },
        { path: 'my-form/:id', component: CandidateFormComponent },
        { path: 'update-form/:id', component: CandidateFormComponent },
        { path: 'candidate-list', component: CandidateListingComponent },
        { path: 'coordinate-list', component: CandidateListingComponent },
        { path: 'candidate-details/:id', component: CandidateDetailsComponent },
        { path: 'candidate/update-register/:id', component: UpdateRegisterComponent },
        { path: 'coordinator/update-register/:id', component: UpdateRegisterComponent },
        { path: 'my-details/:id', component: CandidateDetailsComponent },
        { path: 'add-center', component: CenterFormComponent },
        { path: 'center-list', component: CenterListComponent },
        { path: 'update-center/:id', component: CenterFormComponent },
        { path: 'add-timesheet', component: TimesheetsComponent },
        { path: 'timesheet-list', component: TimesheetslistComponent },
        { path: 'examination-form', component: ExaminationformComponent },
        { path: 'examination-candidate-list', component: ExaminationListComponent },
        { path: 'examination-candidate-list-details/:id', component: ExaminationCandidateListViewDetailsComponent },
        { path: 'add-examination-center', component: AddexaminationcenterComponent },
        { path: 'admit-card/:id', component: AdmitcardComponent },
        { path: 'verify-admit-card/:id', component: AdmitcardComponent },
        { path: 'verification', component: VerificationComponent },
        { path: 'statement-theory', component: MarksheetComponent },
        { path: 'statement-practical', component: MarksheetComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
