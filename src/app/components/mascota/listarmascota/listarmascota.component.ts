import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Mascota } from '../../../models/mascota';
import { MascotaService } from '../../../services/mascota.service';

@Component({
  selector: 'app-listarmascota',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSnackBarModule, RouterLink, MatIconModule,MatButtonModule],
  templateUrl: './listarmascota.component.html',
  styleUrl: './listarmascota.component.scss'
})
export class ListarmascotaComponent implements OnInit{
  dataSource:MatTableDataSource<Mascota>=new MatTableDataSource()
  displayedColumns: string[]=['a','b','c','d','e','f'];
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private mS:MascotaService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletear(id:number){
    if (window.confirm('¿Eliminar este Registro?')) {
      this.mS.eliminar(id).subscribe((data) => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
          this.snackBar.open('Se eliminó el Registro', '', {duration: 3000,})
        });
      });
    }
  }

}
