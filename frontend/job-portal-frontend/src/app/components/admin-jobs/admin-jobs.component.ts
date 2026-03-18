import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css'],
})
export class AdminJobsComponent implements OnInit {
  jobs: any[] = [];

  jobForm: any = {
    jobTitle: '',
    company: '',
    description: '',
    location: '',
    salaryRange: '',
  };

  editMode = false;
  selectedJobId: number = 0;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs().subscribe((data: any) => {
      this.jobs = data;
    });
  }

  saveJob() {
    if (this.editMode) {
      this.jobService
        .updateJob(this.selectedJobId, this.jobForm)
        .subscribe(() => {
          alert('Job Updated Successfully');
          this.resetForm();
          this.loadJobs();
        });
    } else {
      this.jobService.createJob(this.jobForm).subscribe(() => {
        alert('Job Created Successfully');
        this.resetForm();
        this.loadJobs();
      });
    }
  }

  editJob(job: any) {
    this.editMode = true;
    this.selectedJobId = job.jobId;

    this.jobForm = {
      jobTitle: job.jobTitle,
      company: job.company,
      description: job.description,
      location: job.location,
      salaryRange: job.salaryRange,
    };
  }

  deleteJob(id: number) {
    if (confirm('Are you sure to delete this job?')) {
      this.jobService.deleteJob(id).subscribe({
        next: (res: any) => {
          alert('Job Deleted Successfully');
          this.loadJobs();
        },
        error: (err) => {
          console.error(err);
          alert('Job already deleted or not found');
        },
      });
    }
  }
  resetForm() {
    this.editMode = false;
    this.selectedJobId = 0;

    this.jobForm = {
      jobTitle: '',
      company: '',
      description: '',
      location: '',
      salaryRange: '',
    };
  }
}
