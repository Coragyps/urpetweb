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
import { UsuarioService } from './services/usuario.service';

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
  verificado=false;
  anchoPantalla=0;

  role: string = ''
  username: string = ''
  id: number=0
  name: string=''
  photo: string=''
  constructor(private loginService:LoginService, private uS:UsuarioService) {}

  ngOnInit() {
    this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      this.verificado = isLoggedIn;
      if (isLoggedIn) {
        this.loadUserData();
      } else {
        this.role = '';
        this.username = '';
        this.id=0
        this.name=''
        this.photo=''
      }
    });
  }

  cerrar() {
    this.loginService.logout();
  }

  /*loadUserData() {
    const userData = this.loginService.showUserData();
    this.role = userData.role;
    this.username = userData.username;
  }*/

  loadUserData() {
    const userData = this.loginService.showUserData();
    this.role = userData.role;
    this.username = userData.username;

    this.uS.getUserByUsername(this.username).subscribe(
      (userDetails: any) => {
        this.id = userDetails.usuarioId;
        this.name = userDetails.usuarioNombre;
        this.photo = userDetails.usuarioFoto;
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    )
  }

  margin() {
    if (!this.verificado) {
      return '0';
    }
    return this.colapsado ? '14rem' : '5rem';
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
