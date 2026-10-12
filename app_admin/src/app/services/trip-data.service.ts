import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/api/trips';

  // GET all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  // GET a single trip by code (API returns an array with one element)
  getTrip(tripCode: string): Observable<Trip[]> {
    // console.log('Inside TripDataService::getTrip');
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  // POST a new trip
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  // PUT changes to an existing trip
  updateTrip(formData: Trip): Observable<Trip> {
    // console.log('Inside TripDataService::updateTrip');
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  // DELETE a trip by code
  deleteTrip(tripCode: string): Observable<any> {
    return this.http.delete(this.url + '/' + tripCode);
  }
}
