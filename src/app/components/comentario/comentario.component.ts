import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcomentarioComponent } from './listarcomentario/listarcomentario.component';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [RouterOutlet, ListarcomentarioComponent],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.scss'
})
export class ComentarioComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
