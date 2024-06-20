import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { Paseador } from '../../../models/paseador';
import { Usuario } from '../../../models/usuario';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PaseadorService } from '../../../services/paseador.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-creaeditapaseador',
  standalone: true,
  imports: [RouterLink, MatDatepickerModule, NgxMatTimepickerModule, MatSnackBarModule,MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, CommonModule, ReactiveFormsModule, MatSelectModule, FormsModule, MatSlideToggleModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditapaseador.component.html',
  styleUrl: './creaeditapaseador.component.scss'
})
export class CreaeditapaseadorComponent implements OnInit{
  form: FormGroup=new FormGroup({})
  paseador: Paseador=new Paseador()
  listaUsuarios:Usuario[] = []
  edicion:boolean=false
  id:number=0

  estadosDisponibles: { value: string; viewValue: string }[] = [
    {value: 'DISPONIBLE', viewValue: 'Disponible'},
    {value: 'SERVICIO', viewValue: 'En Servicio'},
  ]

  constructor(
    private pS:PaseadorService,
    private router:Router,
    private formBuilder:FormBuilder,
    private uS:UsuarioService,
    private route:ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  aceptar(): void{
    if (this.form.valid) {
      this.paseador.paseadorId=this.form.value.codigo
      this.paseador.paseadorEstado=this.form.value.estado

      this.paseador.paseadorHoraInicio=this.form.value.horainicio
      this.paseador.paseadorHoraFin=this.form.value.horafin

      this.paseador.paseadorLatitud=this.form.value.latitud
      this.paseador.paseadorLongitud=this.form.value.longitud
      this.paseador.paseadorPrecio=this.form.value.precio
      this.paseador.paseadorSlogan=this.form.value.slogan
      this.paseador.paseadorEdad=this.form.value.edad
      this.paseador.paseadorDescripcion=this.form.value.descripcion
      this.paseador.paseadorFacebook=this.form.value.facebook
      this.paseador.paseadorInstagram=this.form.value.instagram
      this.paseador.usuario.usuarioId=this.form.value.usuario
      this.paseador.paseadorValidado = this.form.value.validado

      this.pS.insert(this.paseador).subscribe((data)=>{
        this.pS.list().subscribe((data)=>{
          this.pS.setList(data)
          if (this.edicion) {this.snackBar.open('Se modificó el Registro', '', { duration: 3000 })}
        })
      })
    }
    this.router.navigate(['paseadores'])
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params)=>{
      this.id=data['id']
      this.edicion=data['id'] != null
      this.init();
    })
    this.form=this.formBuilder.group({
      codigo: [''],
      estado: [''],
      horainicio:[''],
      horafin:[''],
      latitud: [''],
      longitud: [''],
      precio: [''],
      edad:[''],
      slogan:[''],
      descripcion:[''],
      facebook: [''],
      instagram:[''],
      usuario: [''],
      validado: [false],
    })
    this.uS.list().subscribe((data)=>{
      this.listaUsuarios=data
    })
  }

  init(): void{
    if (this.edicion) {this.pS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        codigo:new FormControl(data.paseadorId),
        estado:new FormControl(data.paseadorEstado),

        horainicio:new FormControl(data.paseadorHoraInicio.substring(0,5)),
        horafin:new FormControl(data.paseadorHoraFin.substring(0,5)),

        latitud:new FormControl(data.paseadorLatitud),
        longitud:new FormControl(data.paseadorLongitud),
        precio:new FormControl(data.paseadorPrecio),
        slogan:new FormControl(data.paseadorSlogan),
        edad:new FormControl(data.paseadorEdad),
        descripcion:new FormControl(data.paseadorDescripcion),
        facebook:new FormControl(data.paseadorFacebook),
        instagram:new FormControl(data.paseadorInstagram),
        usuario:new FormControl(data.usuario.usuarioId),
        validado: new FormControl(data.paseadorValidado),
      })
    })}
  }
}
