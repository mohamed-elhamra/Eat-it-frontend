import { environment } from './../../environments/environment';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(user: User) {
    return this.http.post(`${environment.apiURL}/users`, user);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiURL}/users/login`, data);
  }

  getByPublicID(publicId: string) {
    return this.http.get(`${environment.apiURL}/users/${publicId}`);
  }
}
