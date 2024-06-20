import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, RouterLink, MatTooltipModule, MatSnackBarModule, NgIf, ReactiveFormsModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.scss'
})
export class ListarusuarioComponent implements OnInit{
  displayedColumns: string[] = [
    'fot',
    'use',
    'nom',
    'tel',
    'cor',
    'acc'
  ];
  
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private uS:UsuarioService, private snackBar:MatSnackBar,) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
    this.uS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
    
  }
  
  deletear(id: number) {
    if (window.confirm('¿Eliminar este Registro?')) {
      this.uS.eliminar(id).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
          this.snackBar.open('Se eliminó el Registro', '', {duration: 3000,})
        });
      });
    }
  }

}
