import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateListingComponent } from './candidate-listing/candidate-listing.component';
import { CenterFormComponent } from './center-form/center-form.component';
import { CenterListComponent } from './center-list/center-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardComponent } from './dashboard.component';
import { UpdateRegisterComponent } from './update-register/update-register.component';

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

    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
