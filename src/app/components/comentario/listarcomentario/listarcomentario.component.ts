import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Comentario } from '../../../models/comentario';
import { ComentarioService } from '../../../services/comentario.service';

@Component({
  selector: 'app-listarcomentario',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSnackBarModule, RouterLink, MatIconModule,MatButtonModule],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.scss'
})
export class ListarcomentarioComponent implements OnInit {
  dataSource:MatTableDataSource<Comentario>=new MatTableDataSource()
  displayedColumns: string[]=['a','b','c','d'];
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private cS:ComentarioService, private snackBar:MatSnackBar) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletear(id: number) {
    if (window.confirm('¿Eliminar este Registro?')) {
      this.cS.eliminar(id).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
          this.snackBar.open('Se eliminó el Registro', '', {duration: 3000,})
        });
      });
    }
  }
}
