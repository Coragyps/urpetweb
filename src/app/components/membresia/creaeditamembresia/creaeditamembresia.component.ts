import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Membresia } from '../../../models/membresia';
import { Usuario } from '../../../models/usuario';
import { MembresiaService } from '../../../services/membresia.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-creaeditamembresia',
  standalone: true,
  imports: [RouterLink, MatSnackBarModule,MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, CommonModule, ReactiveFormsModule, MatSelectModule, MatDatepickerModule, FormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditamembresia.component.html',
  styleUrl: './creaeditamembresia.component.scss'
})
export class CreaeditamembresiaComponent implements OnInit{
  form: FormGroup=new FormGroup({})
  membresia: Membresia=new Membresia()
  listaUsuarios:Usuario[] = []
  edicion:boolean=false
  id:number=0

  estadosDisponibles: { value: string; viewValue: string }[] = [
    {value: 'ACTIVA', viewValue: 'Activa'},
    {value: 'FINALIZADA', viewValue: 'Finalizada'},
    {value: 'CANCELADA', viewValue: 'Cancelada'},
  ]

  constructor(
    private mS:MembresiaService,
    private router:Router,
    private formBuilder:FormBuilder,
    private uS:UsuarioService,
    private route:ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params)=>{
      this.id=data['id']
      this.edicion=data['id'] != null
      this.init();
    })
    this.form=this.formBuilder.group({
      codigo: [''],
      estado: [''],
      fechaInicio:[''],
      fechaFin:[''],
      usuario: [''],
    })
    this.uS.list().subscribe((data)=>{
      this.listaUsuarios=data
    })
  }

  aceptar(): void{
    if (this.form.valid) {
      this.membresia.membresiaId=this.form.value.codigo
      this.membresia.membresiaEstado=this.form.value.estado
      this.membresia.membresiaFechaInicio=this.form.value.fechaInicio
      this.membresia.membresiaFechaFin=this.form.value.fechaFin
      this.membresia.usuario.usuarioId=this.form.value.usuario
      this.mS.insert(this.membresia).subscribe((data)=>{
        this.mS.list().subscribe((data)=>{
          this.mS.setList(data)
          if (this.edicion) {this.snackBar.open('Se modificó el Registro', '', { duration: 3000 })}
        })
      })
    }
    this.router.navigate(['membresias'])
  }
  init(){
    if (this.edicion) {this.mS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        codigo:new FormControl(data.membresiaId),
        estado: new FormControl(data.membresiaEstado),
        fechaInicio:new FormControl(data.membresiaFechaInicio),
        fechaFin:new FormControl(data.membresiaFechaFin),
        usuario:new FormControl(data.usuario.usuarioId),
      })
    })}
  }
}
