import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Boleta } from '../../../models/boleta';
import { BoletaService } from '../../../services/boleta.service';

@Component({
  selector: 'app-listarboleta',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSnackBarModule, RouterLink, MatIconModule,MatButtonModule],
  templateUrl: './listarboleta.component.html',
  styleUrl: './listarboleta.component.scss'
})
export class ListarboletaComponent implements OnInit {
  dataSource:MatTableDataSource<Boleta>=new MatTableDataSource()
  displayedColumns: string[]=['a','b','c','d','e','f'];
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private bS:BoletaService, private snackBar:MatSnackBar) {}
  ngOnInit(): void {
    this.bS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.bS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletear(id: number) {
    if (window.confirm('¿Eliminar este Registro?')) {
      this.bS.eliminar(id).subscribe((data) => {
        this.bS.list().subscribe((data) => {
          this.bS.setList(data);
          this.snackBar.open('Se eliminó el Registro', '', {duration: 3000,})
        });
      });
    }
  }
}
