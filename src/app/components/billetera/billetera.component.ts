import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarbilleteraComponent } from './listarbilletera/listarbilletera.component';

@Component({
  selector: 'app-billetera',
  standalone: true,
  imports: [RouterOutlet, ListarbilleteraComponent],
  templateUrl: './billetera.component.html',
  styleUrl: './billetera.component.scss'
})
export class BilleteraComponent implements OnInit{
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {}
}
