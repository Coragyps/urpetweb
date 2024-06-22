import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './services/login.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatRippleModule,
    MatTooltipModule,
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'urpetweb';
  colapsado=true;
  anchoPantalla=0;

  role: string = ''
  constructor(private loginService:LoginService) {}

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role=this.loginService.showRole()
    return this.loginService.verificar()
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }

  isCliente() {
    return this.role === 'CLIENTE';
  }

  isPaseador() {
    return this.role === 'PASEADOR';
  }
}
