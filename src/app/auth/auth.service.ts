import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<string>('');
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private router: Router) {}

  isAuthenticated() {
    return this.currentUserSubject.value ? true : false;
  }

  login(user) {
    // TODO: Login request to backend
    this.currentUserSubject.next(user.name);
    this.router.navigate(['/']);
  }

  logout() {
    // TODO: Logout request to backend
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
