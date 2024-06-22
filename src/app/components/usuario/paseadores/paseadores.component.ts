import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-paseadores',
  standalone: true,
  imports: [MatSnackBarModule, MatSlideToggleModule, MatCardModule, MatIconModule,MatFormFieldModule,NgIf,ReactiveFormsModule,MatButtonModule,MatInputModule,MatSelectModule,CommonModule,RouterLink],
  templateUrl: './paseadores.component.html',
  styleUrl: './paseadores.component.scss'
})
export class PaseadoresComponent implements OnInit{
  oculto = true;
  form: FormGroup = new FormGroup({})
  usuario: Usuario = new Usuario()
  id:number=0

  constructor(
    private uS:UsuarioService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private snackBar:MatSnackBar,
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const username = this.form.value.usuario;
      this.form.disable();
      this.uS.existsByUsername(username).subscribe((exists: boolean) => {
        if (exists) {
          this.form.controls['usuario'].setErrors({ usernameTaken: true });
          this.snackBar.open('El nombre de usuario ya está en uso', 'OK', { duration: 3000 });
          this.form.enable();
        } else {
          this.usuario.usuarioId = 0;
          this.usuario.username = this.form.value.usuario;
          this.usuario.password = this.form.value.contrasena;
          this.usuario.enabled = true;
          this.usuario.usuarioNombre = this.form.value.nombre;
          this.usuario.usuarioTelefono = this.form.value.telefono;
          this.usuario.usuarioCorreo = this.form.value.correo;
          this.usuario.usuarioFoto = 'assets/res/userpic.jpg';
          this.uS.insertwithrol(this.usuario,'PASEADOR').subscribe(() => {
            this.snackBar.open('Bienvenido a UR PET', 'OK', { duration: 3000 });
            this.router.navigate(['usuarios']);
          }, error => {
            this.snackBar.open('Ocurrio un Error', 'OK', { duration: 3000 });
            this.form.enable();
          });
        }
      });
    }
  }
}
