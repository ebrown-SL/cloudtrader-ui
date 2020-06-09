import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  serverError: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.serverError = '';
    this.authService.login(this.loginForm.value)
    .subscribe(() => {
      this.router.navigate(['/']);
    }, err => {
      this.serverError = err.error.message;
    });
  }
}
