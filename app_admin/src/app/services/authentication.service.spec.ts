import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';
import { fakeToken } from '../utils/test-token';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.removeItem('travlr-token');
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthenticationService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => localStorage.removeItem('travlr-token'));

  it('is logged out with no token', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('is logged in with an unexpired token and reads the user from it', () => {
    service.saveToken(fakeToken(3600));
    expect(service.isLoggedIn()).toBeTrue();
    expect(service.getCurrentUser().name).toBe('Joe Smith');
  });

  it('treats an expired token as logged out', () => {
    service.saveToken(fakeToken(-60));
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('logout removes the token', () => {
    service.saveToken(fakeToken(3600));
    service.logout();
    expect(service.getToken()).toBe('');
  });

  it('login stores the token returned by the API', () => {
    const token = fakeToken(3600);
    service.login({ name: 'Joe Smith', email: 'jsmith9867@example.com' }, 'secret').subscribe();
    http.expectOne('http://localhost:3000/api/login').flush({ token });
    expect(service.getToken()).toBe(token);
  });
});
