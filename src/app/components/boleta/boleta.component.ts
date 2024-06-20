import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarboletaComponent } from './listarboleta/listarboleta.component';

@Component({
  selector: 'app-boleta',
  standalone: true,
  imports: [RouterOutlet, ListarboletaComponent],
  templateUrl: './boleta.component.html',
  styleUrl: './boleta.component.scss'
})
export class BoletaComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
