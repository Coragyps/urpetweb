import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmembresiaComponent } from './listarmembresia/listarmembresia.component';

@Component({
  selector: 'app-membresia',
  standalone: true,
  imports: [RouterOutlet, ListarmembresiaComponent],
  templateUrl: './membresia.component.html',
  styleUrl: './membresia.component.scss'
})
export class MembresiaComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
