import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css'],
})
export class MyApplicationsComponent implements OnInit {
  applications: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications() {
    this.http
      .get<any[]>('http://localhost:5226/api/applications/my')
      .subscribe({
        next: (data) => {
          this.applications = data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
