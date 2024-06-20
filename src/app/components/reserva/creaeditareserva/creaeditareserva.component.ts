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
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Reserva } from '../../../models/reserva';
import { Mascota } from '../../../models/mascota';
import { Paseador } from '../../../models/paseador';
import { ReservaService } from '../../../services/reserva.service';
import { PaseadorService } from '../../../services/paseador.service';
import { MascotaService } from '../../../services/mascota.service';

@Component({
  selector: 'app-creaeditareserva',
  standalone: true,
  imports: [RouterLink, MatDatepickerModule, NgxMatTimepickerModule, MatSnackBarModule,MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, CommonModule, ReactiveFormsModule, MatSelectModule, FormsModule, MatSlideToggleModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditareserva.component.html',
  styleUrl: './creaeditareserva.component.scss'
})
export class CreaeditareservaComponent implements OnInit{
  form: FormGroup=new FormGroup({})
  reserva: Reserva=new Reserva()
  //listaUsuarios:Usuario[] = []
  listaPaseadores:Paseador[] = []
  listaMascotas:Mascota[] = []
  edicion:boolean=false
  id:number=0

  estadosDisponibles: { value: string; viewValue: string }[] = [
    {value: 'FINALIZADA', viewValue: 'Finalizada'},
    {value: 'PENDIENTE', viewValue: 'Pendiente'},
    {value: 'ACEPTADA', viewValue: 'Aceptada'},
    {value: 'RECHAZADA', viewValue: 'Rechaza'},
  ]

  constructor(
    private rS:ReservaService,
    private router:Router,
    private formBuilder:FormBuilder,

    private pS:PaseadorService,
    private mS:MascotaService,

    private route:ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  aceptar(): void{
    if (this.form.valid) {
      this.reserva.reservaId=this.form.value.codigo
      this.reserva.reservaEstado=this.form.value.estado
      this.reserva.reservaFecha=this.form.value.fecha

      this.reserva.reservaHoraInicio=this.form.value.horainicio
      this.reserva.reservaHoraFin=this.form.value.horafin

      this.reserva.mascota.mascotaId=this.form.value.mascota
      this.reserva.paseador.paseadorId=this.form.value.paseador
      this.rS.insert(this.reserva).subscribe((data)=>{
        this.rS.list().subscribe((data)=>{
          this.rS.setList(data)
          if (this.edicion) {this.snackBar.open('Se modificó el Registro', '', { duration: 3000 })}
        })
      })
    }
    this.router.navigate(['reservas'])
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
      fecha:[''],
      horainicio:[''],
      horafin:[''],
      mascota: [''],
      paseador: [''],
    })
    this.pS.list().subscribe((data)=>{
      this.listaPaseadores=data
    })
    this.mS.list().subscribe((data)=>{
      this.listaMascotas=data
    })
  }

  init(): void{
    if (this.edicion) {this.rS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        codigo:new FormControl(data.reservaId),
        estado:new FormControl(data.reservaEstado),
        fecha:new FormControl(data.reservaFecha),

        horainicio:new FormControl(data.reservaHoraInicio.substring(0,5)),
        horafin:new FormControl(data.reservaHoraFin.substring(0,5)),

        mascota:new FormControl(data.mascota.mascotaId),
        paseador:new FormControl(data.paseador.paseadorId),
      })
    })}
  }
}
