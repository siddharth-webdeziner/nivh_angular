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

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardFormComponent,
    DashboardHomeComponent,
    ChangePasswordComponent,
    CandidateFormComponent,
    CandidateListingComponent,
    CandidateDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class DashboardModule { }
