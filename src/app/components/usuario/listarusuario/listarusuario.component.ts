import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'username',
    'password',
    'enabled',
    'usuarionombre',
    'usuariotelefono',
    'usuariocorreo',
    'usuariofoto',
    'acciones'
  ];
  
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  constructor(private uS:UsuarioService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.uS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    
  }
  
  deletear(){}

}
