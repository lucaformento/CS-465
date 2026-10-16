import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TripCardComponent } from './trip-card.component';
import { trips } from '../data/trips';
import { fakeToken } from '../utils/test-token';

describe('TripCardComponent', () => {
  let component: TripCardComponent;
  let fixture: ComponentFixture<TripCardComponent>;

  beforeEach(async () => {
    localStorage.removeItem('travlr-token');
    await TestBed.configureTestingModule({
      imports: [TripCardComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(TripCardComponent);
    component = fixture.componentInstance;
    component.trip = trips[0];  // mock data
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the mock trip name, resort, and price', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.card-header')?.textContent).toContain('Gale Reef');
    expect(el.textContent).toContain('Emerald Bay');
    expect(el.textContent).toContain('$799.00');
  });

  it('should stash the trip code and navigate on edit', () => {
    component.editTrip(trips[0] as any);
    expect(localStorage.getItem('tripCode')).toBe('GALR210214');
  });

  it('should hide Edit and Delete when logged out', () => {
    expect(fixture.nativeElement.querySelector('.card-footer')).toBeNull();
  });

  it('should show Edit and Delete when logged in', () => {
    localStorage.setItem('travlr-token', fakeToken(3600));
    fixture.detectChanges();
    const footer = fixture.nativeElement.querySelector('.card-footer');
    expect(footer.textContent).toContain('Edit Trip');
    expect(footer.textContent).toContain('Delete');
    localStorage.removeItem('travlr-token');
  });
});
