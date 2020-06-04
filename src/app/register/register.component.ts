import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { Credentials } from '../shared/models/credentials.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  onSubmit(credentials: Credentials) {
    this.authService.register(credentials);
  }
}
