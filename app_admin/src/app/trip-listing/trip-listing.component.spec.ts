import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TripListingComponent } from './trip-listing.component';
import { TripDataService } from '../services/trip-data.service';
import { trips } from '../data/trips';
import { fakeToken } from '../utils/test-token';

// Stub service returns mock data instead of calling the API
class MockTripDataService {
  getTrips() { return of(trips); }
  deleteTrip() { return of({}); }
}

describe('TripListingComponent', () => {
  let fixture: ComponentFixture<TripListingComponent>;

  beforeEach(async () => {
    localStorage.removeItem('travlr-token');
    await TestBed.configureTestingModule({
      imports: [TripListingComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    })
    .overrideComponent(TripListingComponent, {
      set: { providers: [{ provide: TripDataService, useClass: MockTripDataService }] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripListingComponent);
    fixture.detectChanges();
  });

  it('should render one trip card per mock trip', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-trip-card');
    expect(cards.length).toBe(trips.length);
  });

  it('should report the trip count', () => {
    expect(fixture.componentInstance.message).toBe('There are 3 trips available.');
  });

  it('should remove a trip from the list when deleted', () => {
    fixture.componentInstance.onTripDeleted('GALR210214');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-trip-card').length).toBe(2);
  });

  it('should hide Add Trip when logged out and show it when logged in', () => {
    expect(fixture.nativeElement.textContent).not.toContain('Add Trip');
    localStorage.setItem('travlr-token', fakeToken(3600));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Add Trip');
    localStorage.removeItem('travlr-token');
  });
});
