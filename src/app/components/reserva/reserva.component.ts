import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarreservaComponent } from './listarreserva/listarreserva.component';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [RouterOutlet, ListarreservaComponent],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss'
})
export class ReservaComponent implements OnInit{
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {}
}
