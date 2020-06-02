import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentUser')));
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private router: Router) {}

  isAuthenticated() {
    return this.currentUserSubject.value ? true : false;
  }

  login(user) {
    // TODO: Login request to backend
    localStorage.setItem('currentUser', JSON.stringify(user.username));
    this.currentUserSubject.next(user.username);
    this.router.navigate(['/']);
  }

  logout() {
    // TODO: Logout request to backend
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
