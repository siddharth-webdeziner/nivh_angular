import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateListingComponent } from './candidate-listing/candidate-listing.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, children: [
        { path: '', component: DashboardHomeComponent },
        { path: 'register', component: DashboardFormComponent },
        { path: 'change-password', component: ChangePasswordComponent },
        { path: 'candidate-form', component: CandidateFormComponent },
        { path: 'candidate-list', component: CandidateListingComponent },
        { path: 'candidate-details/:id', component: CandidateDetailsComponent }
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
