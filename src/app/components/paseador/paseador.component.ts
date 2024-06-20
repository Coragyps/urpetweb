import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarpaseadorComponent } from './listarpaseador/listarpaseador.component';

@Component({
  selector: 'app-paseador',
  standalone: true,
  imports: [RouterOutlet, ListarpaseadorComponent],
  templateUrl: './paseador.component.html',
  styleUrl: './paseador.component.scss'
})
export class PaseadorComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
