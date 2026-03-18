import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  totalJobs: number = 0;
  totalUsers: number = 0;
  totalApplications: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('http://localhost:5226/api/admin/dashboard')
      .subscribe((res) => {
        this.totalJobs = res.totalJobs;
        this.totalUsers = res.totalUsers;
        this.totalApplications = res.totalApplications;
      });
  }
}
