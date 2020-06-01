import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private loginService: LoginService) {}

  onSubmit() {
    this.loginService.login(this.loginForm.value);
  }
}
