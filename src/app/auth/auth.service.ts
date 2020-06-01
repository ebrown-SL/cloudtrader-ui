import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(credentials) {
    console.log(credentials);
    // TODO: Login request to backend
  }
}
