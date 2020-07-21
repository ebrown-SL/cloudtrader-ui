import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AuthService } from '../auth/auth.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  selectedTab: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }

  ngOnInit() {
    this.currentUser.balance = 200
  }
}
