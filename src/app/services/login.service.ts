import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }
  login(request: JwtRequest) {
    return this.httpClient.post('http://localhost:8081/login', request)
  }

  verificar(){
    let token = sessionStorage.getItem('token')
    return token != null
  }

  showRole() {
    let token = sessionStorage.getItem('token')
    if(!token){
      return null
    }
    const helper = new JwtHelperService()
    const decodedToken = helper.decodeToken(token)
    return decodedToken?.role
  }

}
