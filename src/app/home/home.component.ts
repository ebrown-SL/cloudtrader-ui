import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser: User;

  constructor(private authService: AuthService, private httpClient: HttpClient) {

    this.authService.currentUser
      .subscribe(currentUser => this.currentUser = currentUser)

    this.httpClient.get<number>(`/user/current/balance`)
      .subscribe(balance => this.currentUser.balance = balance)

  }

}
