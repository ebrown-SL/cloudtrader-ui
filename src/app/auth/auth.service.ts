import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { Credentials } from '../shared/models/credentials.model';

const CURRENT_USER = 'currentUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(CURRENT_USER)));
  public readonly currentUser = this.currentUserSubject.asObservable();

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  getToken() {
    return this.currentUserSubject.value ? this.currentUserSubject.value.token : null;
  }

  getUserBalance(): Observable<number> {
    return this.httpClient.get<number>(`/user/current/balance`)
      .pipe(tap((balance: number) => {
        let user = JSON.parse(localStorage.getItem(CURRENT_USER));
        user.balance = balance;
        localStorage.setItem(CURRENT_USER, JSON.stringify(user));
        this.currentUserSubject.next(user);
      }));
  }

  register(credentials: Credentials) {
    return this.httpClient.post(`/authentication/register`, credentials)
      .pipe(tap((user: User) => {
        localStorage.setItem(CURRENT_USER, JSON.stringify(user));
        this.currentUserSubject.next(user);
      }));
  }

  login(credentials: Credentials) {
    return this.httpClient.post(`/authentication/login`, credentials)
      .pipe(tap((user: User) => {
        localStorage.setItem(CURRENT_USER, JSON.stringify(user));
        this.currentUserSubject.next(user);
      }));
  }

  logout() {
    localStorage.removeItem(CURRENT_USER);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
