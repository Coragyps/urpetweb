import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Reserva } from '../../../models/reserva';
import { Boleta } from '../../../models/boleta';
import { BoletaService } from '../../../services/boleta.service';
import { ReservaService } from '../../../services/reserva.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-creaeditaboleta',
  standalone: true,
  imports: [RouterLink, MatDatepickerModule, MatSnackBarModule, MatFormFieldModule, MatButtonModule, MatInputModule,MatIconModule, CommonModule, ReactiveFormsModule,FormsModule, MatSelectModule],
  providers:[provideNativeDateAdapter()],
  templateUrl: './creaeditaboleta.component.html',
  styleUrl: './creaeditaboleta.component.scss'
})
export class CreaeditaboletaComponent implements OnInit{
  form: FormGroup=new FormGroup({})
  boleta: Boleta=new Boleta()
  listaReservas:Reserva[] = []
  edicion:boolean=false
  id:number=0

  monedasDisponibles: { value: string; viewValue: string }[] = [
    {value: 'SOLES', viewValue: 'PEN Soles'},
    {value: 'DOLARES', viewValue: 'USD Dolares'},
  ]

  constructor(
    private bS:BoletaService,
    private router:Router,
    private formBuilder:FormBuilder,
    private rS:ReservaService,
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
      codigo: [{ value: '', disabled: true }],
      monto: [''],
      fecha:[''],
      moneda:[''],
      reserva: [''],
    })
    this.rS.list().subscribe((data)=>{
      this.listaReservas=data
    })
  }


  aceptar(): void{
    if (this.form.valid) {
      this.boleta.boletaId=this.form.value.codigo
      this.boleta.boletaMonto=this.form.value.monto
      this.boleta.boletaImpuesto=(this.form.value.monto*0.15)
      this.boleta.boletaFecha=this.form.value.fecha
      this.boleta.boletaMoneda=this.form.value.moneda
      this.boleta.reserva.reservaId=this.form.value.reserva
      this.bS.insert(this.boleta).subscribe((data)=>{
        this.bS.list().subscribe((data)=>{
          this.bS.setList(data)
          if (this.edicion) {this.snackBar.open('Se modificó el Registro', '', { duration: 3000 })}
        })
      })
    }
    this.router.navigate(['boletas'])
  }

  init(): void {
    if (this.edicion) {this.bS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        codigo:new FormControl(data.boletaId),
        monto:new FormControl(data.boletaMonto),
        fecha:new FormControl(data.boletaFecha),
        moneda:new FormControl(data.boletaMoneda),
        reserva:new FormControl(data.reserva.reservaId),
      })
    })}
  }
}
