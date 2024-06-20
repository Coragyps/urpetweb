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
  selector: 'app-creaeditausuario',
  standalone: true,
  imports: [MatSnackBarModule, MatSlideToggleModule, MatCardModule, MatIconModule,MatFormFieldModule,NgIf,ReactiveFormsModule,MatButtonModule,MatInputModule,MatSelectModule,CommonModule,RouterLink],
  templateUrl: './creaeditausuario.component.html',
  styleUrl: './creaeditausuario.component.scss'
})
export class CreaeditausuarioComponent implements OnInit{
  oculto = true;
  form: FormGroup = new FormGroup({})
  usuario: Usuario = new Usuario()
  edicion: boolean = false
  id:number=0

  constructor(
    private uS:UsuarioService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private snackBar:MatSnackBar,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params)=>{
      this.id = data['id']
      this.edicion=data['id'] != null
      this.init()
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      habilitado: [true],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: [''],
      foto: [''],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const username = this.form.value.usuario;
      this.uS.existsByUsername(username).subscribe((exists: boolean) => {
        if (exists && !this.edicion) {
          this.form.controls['usuario'].setErrors({ usernameTaken: true });
          this.snackBar.open('El nombre de usuario ya está en uso', '', { duration: 3000 });
        } else {
          this.usuario.usuarioId = this.form.value.codigo;
          this.usuario.username = this.form.value.usuario;
          this.usuario.password = this.form.value.contrasena;
          this.usuario.enabled = this.form.value.habilitado;
          this.usuario.usuarioNombre = this.form.value.nombre;
          this.usuario.usuarioTelefono = this.form.value.telefono;
          this.usuario.usuarioCorreo = this.form.value.correo;
          this.usuario.usuarioFoto = this.form.value.foto;
          if (!this.form.value.foto) {this.usuario.usuarioFoto = 'assets/res/userpic.jpg';}
          this.uS.insert(this.usuario).subscribe(() => {
            this.uS.list().subscribe((data) => {
              this.uS.setList(data);
              if (this.edicion) {this.snackBar.open('Se modificó el Registro', '', { duration: 3000 })}
            });
          });
          this.router.navigate(['usuarios']);
        }
      });
    }
  }
  
  init(){
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.usuarioId),
          usuario: new FormControl(data.username),
          contrasena: new FormControl(data.password),
          habilitado: new FormControl(data.enabled),
          nombre: new FormControl(data.usuarioNombre),
          telefono: new FormControl(data.usuarioTelefono),
          correo: new FormControl(data.usuarioCorreo),
          foto: new FormControl(data.usuarioFoto)
        })
      })
    }
  }
  

}
