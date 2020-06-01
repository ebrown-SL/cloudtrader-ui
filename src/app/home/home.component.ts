import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  currentUser: String;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }
}
