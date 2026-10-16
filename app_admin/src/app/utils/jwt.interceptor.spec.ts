import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { authInterceptProvider } from './jwt.interceptor';
import { fakeToken } from './test-token';

describe('JwtInterceptor', () => {
  let http: HttpClient;
  let ctrl: HttpTestingController;

  beforeEach(() => {
    localStorage.removeItem('travlr-token');
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        authInterceptProvider
      ]
    });
    http = TestBed.inject(HttpClient);
    ctrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => localStorage.removeItem('travlr-token'));

  it('adds the Bearer token to trip API calls when logged in', () => {
    const token = fakeToken(3600);
    localStorage.setItem('travlr-token', token);
    http.put('http://localhost:3000/api/trips/X', {}).subscribe();
    const req = ctrl.expectOne('http://localhost:3000/api/trips/X');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + token);
  });

  it('does not add a token to login calls', () => {
    localStorage.setItem('travlr-token', fakeToken(3600));
    http.post('http://localhost:3000/api/login', {}).subscribe();
    const req = ctrl.expectOne('http://localhost:3000/api/login');
    expect(req.request.headers.has('Authorization')).toBeFalse();
  });

  it('does not add a token when logged out', () => {
    http.get('http://localhost:3000/api/trips').subscribe();
    const req = ctrl.expectOne('http://localhost:3000/api/trips');
    expect(req.request.headers.has('Authorization')).toBeFalse();
  });
});
