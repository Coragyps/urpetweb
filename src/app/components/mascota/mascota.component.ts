import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import { ListarmascotaComponent } from './listarmascota/listarmascota.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Mascota } from '../../models/mascota';
import { MascotaService } from '../../services/mascota.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [RouterOutlet, ListarmascotaComponent, NgIf, MatCardModule, NgFor, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.scss'
})
export class MascotaComponent implements OnInit{
  dataSource: Mascota[] = [];
  role:string=''
  id:number=0
  constructor(public route:ActivatedRoute, private mS:MascotaService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.role = params['r'] || null;
      this.id = params['u'] || null;
    });

    this.mS.listidcliente(this.id).subscribe((data) => {
      this.dataSource = data
    }) 
  }
}
