import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Billetera } from '../../../models/billetera';
import { BilleteraService } from '../../../services/billetera.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarbilletera',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSnackBarModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './listarbilletera.component.html',
  styleUrl: './listarbilletera.component.scss'
})
export class ListarbilleteraComponent implements OnInit{
  dataSource:MatTableDataSource<Billetera>=new MatTableDataSource()
  displayedColumns: string[]=['b','c','d'];
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private bS:BilleteraService, private snackBar:MatSnackBar,){}
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
