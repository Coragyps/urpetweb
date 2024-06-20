import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Billetera } from '../../../models/billetera';
import { Usuario } from '../../../models/usuario';
import { BilleteraService } from '../../../services/billetera.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditabilletera',
  standalone: true,
  imports: [MatSnackBarModule, MatFormFieldModule,MatButtonModule, MatInputModule, MatIconModule,NgIf,CommonModule, ReactiveFormsModule, MatSelectModule, RouterLink,],
  templateUrl: './creaeditabilletera.component.html',
  styleUrl: './creaeditabilletera.component.scss'
})
export class CreaeditabilleteraComponent implements OnInit{
  form: FormGroup=new FormGroup({})
  billetera:Billetera=new Billetera()
  listaUsuarios:Usuario[]=[]
  edicion: boolean = false
  id:number=0
  
  constructor(
    private bS:BilleteraService,
    private router: Router,
    private formBuilder: FormBuilder,
    private uS:UsuarioService,
    private route:ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void{
    this.route.params.subscribe((data: Params)=>{
      this.id=data['id']
      this.edicion=data['id'] != null
      this.init();
    })
    this.form=this.formBuilder.group({
      codigo: [''],
      monto: [''],
      usuario: [''],
    })
    this.uS.list().subscribe((data)=>{
      this.listaUsuarios=data
    })
  }

  aceptar(): void{
    if (this.form.valid) {
      this.billetera.billeteraId=this.form.value.codigo
      this.billetera.billeteraMonto=this.form.value.monto
      this.billetera.usuario.usuarioId=this.form.value.usuario
      this.bS.insert(this.billetera).subscribe((data)=>{
        this.bS.list().subscribe((data)=>{
          this.bS.setList(data)
          if (this.edicion) {this.snackBar.open('Se modificó el Registro', '', { duration: 3000 })}
        })
      })
    }
    this.router.navigate(['billeteras'])
  }

  init() {
    if (this.edicion) {this.bS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        codigo:new FormControl(data.billeteraId),
        monto:new FormControl(data.billeteraMonto),
        usuario:new FormControl(data.usuario.usuarioId),
      })
    })}
  }

}
