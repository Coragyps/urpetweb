import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../../services/login.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '../../../models/mascota';

@Component({
  selector: 'app-clientelistarmascota',
  standalone: true,
  imports: [RouterLink, NgIf, MatCardModule, NgFor, CommonModule, MatButtonModule, MatIconModule, RouterOutlet],
  templateUrl: './clientelistarmascota.component.html',
  styleUrl: './clientelistarmascota.component.scss'
})
export class ClientelistarmascotaComponent implements OnInit{
  dataSource: Mascota[] = [];
  role: string = ''
  username: string = ''
  id: number=0
  name: string=''
  photo: string=''
  
  constructor(public route:ActivatedRoute, private mS:MascotaService, private loginService:LoginService, private uS: UsuarioService) {}
  ngOnInit(): void {
    const userData = this.loginService.showUserData();
    this.role = userData.role;
    this.username = userData.username;
  
    this.uS.getUserByUsername(this.username).subscribe((userDetails) => {
        this.id = userDetails.usuarioId;
        this.name = userDetails.usuarioNombre;
        this.photo = userDetails.usuarioFoto;
  
        this.mS.listidcliente(this.id).subscribe((data) => {
          this.dataSource = data
        }) 
    },);
  }
}
