import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Mascota } from '../../../models/mascota';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MascotaService } from '../../../services/mascota.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-creaeditamascota',
  standalone: true,
  imports: [MatRadioModule, AsyncPipe, MatAutocompleteModule, MatSlideToggleModule, MatSnackBarModule, MatFormFieldModule,MatButtonModule, MatInputModule, MatIconModule,NgIf,CommonModule, ReactiveFormsModule, MatSelectModule, RouterLink,],
  templateUrl: './creaeditamascota.component.html',
  styleUrl: './creaeditamascota.component.scss'
})
export class CreaeditamascotaComponent implements OnInit{
  form: FormGroup=new FormGroup({})
  mascota:Mascota=new Mascota()
  listaUsuarios:Usuario[]=[]
  edicion: boolean = false
  razasFiltradas!: Observable<string[]>
  id:number=0

  tamanosDisponibles = [
    { value: 'ENANO', viewValue: 'Muy Pequeño' },
    { value: 'CHICO', viewValue: 'Chico' },
    { value: 'MEDIANO', viewValue: 'Mediano' },
    { value: 'GRANDE', viewValue: 'Grande' },
    { value: 'GIGANTE', viewValue: 'Gigante' }
  ];

  raza: string[] = ['Labrador Retriever', 'Shih Tzu', 'Bulldog Francés', 'Yorkshire Terrier', 'Beagle', 'Pastor Alemán', 'Chihuahua', 'Pug', 'Golden Retriever', 'Schnauzer', 'Dálmata', 'Cocker Spaniel', 'Boxer', 'Poodle', 'Rottweiler', 'Maltés', 'Doberman', 'Husky Siberiano', 'Bull Terrier', 'Bichón Frisé', 'Boston Terrier', 'Jack Russell Terrier', 'Caniche', 'West Highland White Terrier', 'Border Collie', 'Lhasa Apso', 'Akita Inu', 'Samoyedo', 'Pekinés', 'Basset Hound'];

  constructor(
    private mS:MascotaService,
    private router: Router,
    private formBuilder: FormBuilder,
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
      nombre: [''],
      foto:[''],
      raza:[''],
      edad: [''],
      sexo: [''],
      tamano:[''],
      usuario: [''],
      habilitado: [true],
    })
    this.uS.list().subscribe((data)=>{
      this.listaUsuarios=data
    })

    this.razasFiltradas = this.form.get('raza')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    )
  }

  aceptar(): void {
    if (this.form.valid) {
      this.mascota.mascotaId=this.form.value.codigo
      this.mascota.macotaNombre=this.form.value.nombre
      this.mascota.mascotaFoto=this.form.value.foto
      this.mascota.mascotaRaza=this.form.value.raza
      this.mascota.mascotaEdad=this.form.value.edad
      this.mascota.mascotaSexo=this.form.value.sexo
      this.mascota.mascotaTamaño=this.form.value.tamano
      this.mascota.mascotaHabilitado=this.form.value.habilitado
      this.mascota.usuario.usuarioId=this.form.value.usuario
      if (!this.form.value.foto) {this.mascota.mascotaFoto = 'assets/img/petpic.jpg';}
      this.mS.insert(this.mascota).subscribe((data)=>{
        this.mS.list().subscribe((data)=>{
          this.mS.setList(data)
          if (this.edicion) {this.snackBar.open('Se modificó el Registro', '', { duration: 3000 })}
        })
      })
    }
    this.router.navigate(['mascotas'])
  }

  init(): void {
    if (this.edicion) {this.mS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        codigo: new FormControl(data.mascotaId),
        nombre: new FormControl(data.macotaNombre),
        foto: new FormControl(data.mascotaFoto),
        raza: new FormControl(data.mascotaRaza),
        edad: new FormControl(data.mascotaEdad),
        sexo: new FormControl(data.mascotaSexo),
        tamano: new FormControl(data.mascotaTamaño),
        habilitado: new FormControl(data.mascotaHabilitado),
        usuario:new FormControl(data.usuario.usuarioId),
      })
    })}
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return this.raza.filter(raza =>
      raza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filterValue)
    );
  }
}
