import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  public readonly currentUser = this.currentUserSubject.asObservable();

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {}

  getToken() {
    return this.currentUserSubject.value ? this.currentUserSubject.value.token : null;
  }

  login(credentials) {
    this.httpClient.post(`${environment.baseUrl}/api/trader/login`, credentials)
    .subscribe((user: User) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.router.navigate(['/']);
    });
  }

  logout() {
    // TODO: Logout request to backend
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
