import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Membresia } from '../../../models/membresia';
import { MembresiaService } from '../../../services/membresia.service';

@Component({
  selector: 'app-listarmembresia',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSnackBarModule, RouterLink, MatIconModule,MatButtonModule],
  templateUrl: './listarmembresia.component.html',
  styleUrl: './listarmembresia.component.scss'
})
export class ListarmembresiaComponent implements OnInit{
  dataSource:MatTableDataSource<Membresia>=new MatTableDataSource()
  displayedColumns: string[]=['a','b','c','d','e'];
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private mS:MembresiaService, private snackBar:MatSnackBar) {}
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

  deletear(id: number) {
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
