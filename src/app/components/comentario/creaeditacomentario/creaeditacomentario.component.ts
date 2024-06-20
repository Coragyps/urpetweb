import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Comentario } from '../../../models/comentario';
import { Reserva } from '../../../models/reserva';
import { ComentarioService } from '../../../services/comentario.service';
import { ReservaService } from '../../../services/reserva.service';

@Component({
  selector: 'app-creaeditacomentario',
  standalone: true,
  imports: [MatSnackBarModule, MatFormFieldModule,MatButtonModule, MatInputModule, MatIconModule,NgIf,CommonModule, ReactiveFormsModule, MatSelectModule, RouterLink,],
  templateUrl: './creaeditacomentario.component.html',
  styleUrl: './creaeditacomentario.component.scss'
})
export class CreaeditacomentarioComponent implements OnInit{
  form: FormGroup=new FormGroup({})
  comentario:Comentario=new Comentario()
  listaReservas:Reserva[]=[]
  edicion: boolean = false
  id:number=0

  constructor(
    private cS:ComentarioService,
    private router: Router,
    private formBuilder: FormBuilder,
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
      codigo: [''],
      texto: [''],
      puntuacion: [''],
      reserva: [''],
    })
    this.rS.list().subscribe((data)=>{
      this.listaReservas=data
    })
  }

  aceptar(): void{
    if (this.form.valid) {
      this.comentario.comentarioId=this.form.value.codigo
      this.comentario.comentarioTexto=this.form.value.texto
      this.comentario.comentarioPuntuacion=this.form.value.puntuacion
      this.comentario.reserva.reservaId=this.form.value.reserva
      this.cS.insert(this.comentario).subscribe((data)=>{
        this.cS.list().subscribe((data)=>{
          this.cS.setList(data)
          if (this.edicion) {this.snackBar.open('Se modificó el Registro', '', { duration: 3000 })}
        })
      })
    }
    this.router.navigate(['comentarios'])
  }

  init(): void{
    if (this.edicion) {this.cS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        codigo:new FormControl(data.comentarioId),
        texto:new FormControl(data.comentarioTexto),
        puntuacion:new FormControl(data.comentarioPuntuacion),
        reserva:new FormControl(data.reserva.reservaId),
      })
    })}
  }
}
