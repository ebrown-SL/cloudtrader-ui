import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup(
    {
      username: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
    },
    { updateOn: 'submit' }
  );

  serverError: string;

  constructor(private authService: AuthService, private router: Router) {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.serverError = '';
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (err) => {
          this.serverError = err.error.message;
        }
      );
    }
  }
}
