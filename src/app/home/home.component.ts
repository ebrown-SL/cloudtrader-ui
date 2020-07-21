import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser: User;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }
}
