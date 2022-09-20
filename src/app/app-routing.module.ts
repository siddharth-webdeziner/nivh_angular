import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { 
    path: '',
    canActivate: [],
    component: HomeComponent 
  },
  { 
    path: 'login/:type',
    canActivate: [],
    component: LoginComponent 
  },
  { 
    path: 'dashboard',
    canActivate: [],
    loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
