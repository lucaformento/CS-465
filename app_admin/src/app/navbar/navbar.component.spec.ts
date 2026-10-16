import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { NavbarComponent } from './navbar.component';
import { fakeToken } from '../utils/test-token';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    localStorage.removeItem('travlr-token');
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
  });

  afterEach(() => localStorage.removeItem('travlr-token'));

  it('shows Log In when logged out', () => {
    expect(fixture.nativeElement.textContent).toContain('Log In');
    expect(fixture.nativeElement.textContent).not.toContain('Log Out');
  });

  it('shows Log Out and the user name when logged in', () => {
    localStorage.setItem('travlr-token', fakeToken(3600));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Log Out');
    expect(fixture.nativeElement.textContent).toContain('Joe Smith');
  });
});
