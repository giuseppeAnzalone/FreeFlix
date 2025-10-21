import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment_BE} from '../environment/environment';
import {LoginResponse} from '../models/login';
import {RegisterResponse} from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private BASE_URL: string = environment_BE;

  fetchRegister( credentials: {username: string, password: string} ) {
    return this.http.post<RegisterResponse>(`${this.BASE_URL}/register`, credentials)
  }


  fetchLogin( credentials: {username: string, password: string} ) {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/login`, credentials)
  }
}
