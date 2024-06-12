import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './services/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'urpetweb';
  role: string = '';
  constructor(private LoginService: LoginService){}

  cerrar(){
    sessionStorage.clear();
  }
  verificar(){
    this.role = this.LoginService.showRole();
    return this.LoginService.verificar();
  }
  isAdmin(){
    return this.role === 'ADMIN';
  }
  isCliente(){
    return this.role === 'CLIENTE';
  }
  isPaseador(){
    return this.role === 'PASEADOR';
  }
}
