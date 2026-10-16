import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  // Read the JWT from localStorage
  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  // Save the JWT to localStorage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Remove the JWT to log out
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Logged in only if a token exists and has not expired
  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // Name and email from the token payload
  public getCurrentUser(): User {
    const user = new User();
    if (this.isLoggedIn()) {
      const { email, name } = JSON.parse(atob(this.getToken().split('.')[1]));
      user.email = email;
      user.name = name;
    }
    return user;
  }

  // Log in and store the returned token
  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.login(user, passwd)
      .pipe(tap((authResp: AuthResponse) => this.saveToken(authResp.token)));
  }

  // Register and store the returned token
  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.register(user, passwd)
      .pipe(tap((authResp: AuthResponse) => this.saveToken(authResp.token)));
  }
}
