import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { UserResponse } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  constructor() { }
  login(email: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/auth/login`, { email, password } , { withCredentials: true });
  }
  signup(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/signup`, {name, email, password });
  }
  logout() {
    return this.http.post(`${this.apiUrl}/signup`, {});
  }
}
