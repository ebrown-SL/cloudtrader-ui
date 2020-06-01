import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser = new BehaviorSubject<String>('');
  public currentUser = this._currentUser.asObservable();

  constructor(private router: Router) {}

  isAuthenticated() {
    return this._currentUser.value ? true : false;
  }

  login(user) {
    // TODO: Login request to backend
    this._currentUser.next(user.name);
    this.router.navigate(['/']);
  }
}
