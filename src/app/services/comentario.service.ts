import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Comentario } from '../models/comentario';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url=`${base_url}/comentario`
  private listaCambio=new Subject<Comentario[]>()

  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get<Comentario[]>(this.url)
  }
  insert(p:Comentario){
    return this.httpClient.post(this.url, p)
  }
  setList(listaNueva: Comentario[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number){
    return this.httpClient.get<Comentario>(`${this.url}/${id}`)
  }
  
  update(c:Comentario){
    return this.httpClient.put(this.url,c)
  }

  eliminar(id:number){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
