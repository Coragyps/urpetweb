import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private url=`${base_url}/reserva`
  private listaCambio=new Subject<Reserva[]>()

  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get<Reserva[]>(this.url)
  }
  insert(p:Reserva){
    return this.httpClient.post(this.url, p)
  }
  setList(listaNueva: Reserva[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number){
    return this.httpClient.get<Reserva>(`${this.url}/${id}`)
  }
  
  update(c:Reserva){
    return this.httpClient.put(this.url,c)
  }

  eliminar(id:number){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
