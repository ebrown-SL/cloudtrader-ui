import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  serverError: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get username() { return this.registerForm.get('username'); }

  get password() { return this.registerForm.get('password'); }

  onSubmit() {
    this.serverError = '';
    this.authService.register(this.registerForm.value)
    .subscribe(() => {
      this.router.navigate(['/']);
    }, err => {
      this.serverError = err.error.message;
    });
  }
}
