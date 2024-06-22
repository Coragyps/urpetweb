import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  login(request: JwtRequest) {
    return this.httpClient.post('http://localhost:8081/login', request);
  }

  verificar(): boolean {
    let token = sessionStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  showUserData() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return { role: null, username: null };
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return {
      role: decodedToken?.role || null,
      username: decodedToken?.sub || null
    };
  }

  private hasToken(): boolean {
    const token = sessionStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  public updateLoginState() {
    this.loggedIn.next(this.hasToken());
  }

  logout() {
    sessionStorage.clear();
    this.updateLoginState();
  }
}