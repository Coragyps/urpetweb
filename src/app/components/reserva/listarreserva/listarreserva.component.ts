import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Reserva } from '../../../models/reserva';
import { ReservaService } from '../../../services/reserva.service';

@Component({
  selector: 'app-listarreserva',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSnackBarModule, RouterLink, MatIconModule,MatButtonModule],
  templateUrl: './listarreserva.component.html',
  styleUrl: './listarreserva.component.scss'
})
export class ListarreservaComponent implements OnInit{
  dataSource:MatTableDataSource<Reserva>=new MatTableDataSource()
  displayedColumns: string[]=['a','b','c','d','e','f'];
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private rS:ReservaService, private snackBar:MatSnackBar) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletear(id: number) {
    if (window.confirm('¿Eliminar este Registro?')) {
      this.rS.eliminar(id).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
          this.snackBar.open('Se eliminó el Registro', '', {duration: 3000,})
        });
      });
    }
  }

}
