import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: string;

  constructor(private router: Router) {}

  login(credentials) {
    // TODO: Login request to backend
    this.currentUser = credentials.name;
    this.router.navigate(['/']);
  }
}
