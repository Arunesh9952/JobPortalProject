import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = environment.apiUrl + '/jobs';

  constructor(private http: HttpClient) {}

  // GET ALL JOBS (Admin + User)
  getJobs() {
    return this.http.get(this.apiUrl);
  }

  // ADMIN - CREATE JOB
  createJob(job: any) {
    return this.http.post(this.apiUrl, job);
  }

  // ADMIN - UPDATE JOB
  updateJob(id: number, job: any) {
    return this.http.put(`${this.apiUrl}/${id}`, job);
  }

  // ADMIN - DELETE JOB
  deleteJob(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
