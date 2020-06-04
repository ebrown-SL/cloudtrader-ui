import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { Credentials } from '../shared/models/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onSubmit(credentials: Credentials) {
    this.authService.login(credentials);
  }
}
