import { Component, OnInit } from '@angular/core';
import { Billetera } from '../../../models/billetera';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BilleteraService } from '../../../services/billetera.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [MatChipsModule, RouterLink, NgIf, MatCardModule, NgFor, CommonModule, MatButtonModule, MatIconModule, RouterOutlet, MatSnackBarModule, MatCardModule,],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {
  dataSource: Billetera = new Billetera;
  role: string = ''
  username: string = ''
  id: number=0

  constructor(
    public route:ActivatedRoute, 
    private bS:BilleteraService, 
    private loginService:LoginService, 
    private uS: UsuarioService,
    private snackBar: MatSnackBar) {}

    ngOnInit(): void {
      const userData = this.loginService.showUserData();
      this.role = userData.role;
      this.username = userData.username;
    
      this.uS.getUserByUsername(this.username).subscribe((userDetails) => {
          this.id = userDetails.usuarioId;
    
          this.bS.balance(this.id).subscribe((data) => {
            this.dataSource=data
            console.log(this.dataSource)
          }) 
      },);
    }

}
