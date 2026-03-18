import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';

import { ApplyJobComponent } from './components/apply-job/apply-job.component';
import { AdminJobsComponent } from './components/admin-jobs/admin-jobs.component';
import { MyApplicationsComponent } from './components/my-applications/my-applications.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'jobs', component: JobListComponent },

  { path: 'apply/:id', component: ApplyJobComponent },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admin/jobs',
    component: AdminJobsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-applications',
    component: MyApplicationsComponent,
    canActivate: [AuthGuard],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
