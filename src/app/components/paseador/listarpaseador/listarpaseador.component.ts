import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PaseadorService } from '../../../services/paseador.service';
import { Paseador } from '../../../models/paseador';

@Component({
  selector: 'app-listarpaseador',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSnackBarModule, RouterLink, MatIconModule,MatButtonModule],
  templateUrl: './listarpaseador.component.html',
  styleUrl: './listarpaseador.component.scss'
})
export class ListarpaseadorComponent implements OnInit{
  dataSource:MatTableDataSource<Paseador>=new MatTableDataSource()
  displayedColumns: string[]=['a','b','c','d','e','f'];
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private pS:PaseadorService, private snackBar:MatSnackBar) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletear(id: number) {
    if (window.confirm('¿Eliminar este Registro?')) {
      this.pS.eliminar(id).subscribe((data) => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
          this.snackBar.open('Se eliminó el Registro', '', {duration: 3000,})
        });
      });
    }
  }
}
