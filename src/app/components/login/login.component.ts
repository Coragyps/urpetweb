import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { JwtRequest } from '../../models/jwtRequest';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf,CommonModule,MatFormFieldModule,MatButtonModule,MatInputModule, MatIconModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  oculto = true;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  ngOnInit(): void { }
  login() {
    let request = new JwtRequest()
    request.username=this.username
    request.password=this.password
    
    this.loginService.login(request).subscribe((data: any)=>{
      sessionStorage.setItem('token', data.jwttoken)
      this.loginService.updateLoginState()
      this.router.navigate(['inicio'])
    },
    (error)=>{
      this.snackBar.open('Credenciales Incorrectas', 'OK', { duration: 2000 })
    })
  }
}
