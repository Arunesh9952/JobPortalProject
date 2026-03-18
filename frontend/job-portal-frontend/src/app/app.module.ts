import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { ApplyJobComponent } from './components/apply-job/apply-job.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdminJobsComponent } from './components/admin-jobs/admin-jobs.component';
import { MyApplicationsComponent } from './components/my-applications/my-applications.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    JobListComponent,
    ApplyJobComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    AdminJobsComponent,
    ApplyJobComponent,
    MyApplicationsComponent,
  ],

  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
