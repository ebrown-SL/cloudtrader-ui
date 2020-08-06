import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../shared/models/user.model';
import { Credentials } from '../shared/models/credentials.model';

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

  register(credentials: Credentials) {
    return this.httpClient.post(`/authentication/register`, credentials)
    .pipe(tap((user: User) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }));
  }

  login(credentials: Credentials) {
    return this.httpClient.post(`/authentication/login`, credentials)
    .pipe(tap((user: User) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
