import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TripDataService } from './trip-data.service';
import { trips } from '../data/trips';

describe('TripDataService', () => {
  let service: TripDataService;
  let http: HttpTestingController;
  const url = 'http://localhost:3000/api/trips';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TripDataService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('GET retrieves all trips', () => {
    service.getTrips().subscribe(res => expect(res.length).toBe(3));
    const req = http.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(trips);
  });

  it('GET retrieves one trip by code', () => {
    service.getTrip('DAWR210315').subscribe(res => expect(res[0].code).toBe('DAWR210315'));
    const req = http.expectOne(url + '/DAWR210315');
    expect(req.request.method).toBe('GET');
    req.flush([trips[1]]);
  });

  it('POST adds a trip', () => {
    const newTrip: any = { ...trips[0], code: 'MEGR220119', name: 'Mega Reef' };
    service.addTrip(newTrip).subscribe(res => expect(res.name).toBe('Mega Reef'));
    const req = http.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.code).toBe('MEGR220119');
    req.flush(newTrip);
  });

  it('PUT updates a trip by code', () => {
    const changed: any = { ...trips[0], name: 'Gale Reef Updated' };
    service.updateTrip(changed).subscribe(res => expect(res.name).toBe('Gale Reef Updated'));
    const req = http.expectOne(url + '/GALR210214');
    expect(req.request.method).toBe('PUT');
    req.flush(changed);
  });

  it('DELETE removes a trip by code', () => {
    service.deleteTrip('CLAR210621').subscribe();
    const req = http.expectOne(url + '/CLAR210621');
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Trip deleted: CLAR210621' });
  });

  it('POST sends credentials to /login', () => {
    const user: any = { name: 'Joe Smith', email: 'jsmith9867@example.com' };
    service.login(user, 'secret').subscribe(res => expect(res.token).toBe('abc'));
    const req = http.expectOne('http://localhost:3000/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.password).toBe('secret');
    req.flush({ token: 'abc' });
  });
});
