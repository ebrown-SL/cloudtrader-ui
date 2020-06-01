import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.loginForm.value);
  }
}
