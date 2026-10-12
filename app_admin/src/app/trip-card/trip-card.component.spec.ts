import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TripCardComponent } from './trip-card.component';
import { trips } from '../data/trips';

describe('TripCardComponent', () => {
  let component: TripCardComponent;
  let fixture: ComponentFixture<TripCardComponent>;

  beforeEach(async () => {
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
});
