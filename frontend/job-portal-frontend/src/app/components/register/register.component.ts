import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    role: 'User',
  };

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http
      .post('http://localhost:5226/api/auth/register', this.user)
      .subscribe({
        next: (res: any) => {
          alert('Registration Successful');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          alert('Registration Failed');
        },
      });
  }
}
