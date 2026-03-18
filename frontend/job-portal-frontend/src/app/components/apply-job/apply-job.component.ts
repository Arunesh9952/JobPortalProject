import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css'],
})
export class ApplyJobComponent implements OnInit {
  application: any = {
    jobId: '',
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    skills: '',
    coverLetter: '',
    resume: null,
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // get job id from route
    this.application.jobId = this.route.snapshot.params['id'];
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.application.resume = file;
    }
  }

  apply() {
    this.http
      .post('http://localhost:5226/api/applications', this.application)
      .subscribe({
        next: () => {
          alert('Application submitted successfully');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to submit application');
        },
      });
  }
}
