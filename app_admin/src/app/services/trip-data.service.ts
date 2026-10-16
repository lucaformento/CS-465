import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000/api';
  url = this.baseUrl + '/trips';

  // GET all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  // GET a single trip by code (API returns an array with one element)
  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  // POST a new trip (token added by the interceptor)
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  // PUT changes to an existing trip (token added by the interceptor)
  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  // DELETE a trip by code (token added by the interceptor)
  deleteTrip(tripCode: string): Observable<any> {
    return this.http.delete(this.url + '/' + tripCode);
  }

  // POST credentials to /login
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  // POST a new user to /register
  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  // Shared helper for login and register
  handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
}
