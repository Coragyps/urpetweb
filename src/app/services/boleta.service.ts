import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Boleta } from '../models/boleta';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  private url=`${base_url}/boleta`
  private listaCambio=new Subject<Boleta[]>()

  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get<Boleta[]>(this.url)
  }
  insert(p:Boleta){
    return this.httpClient.post(this.url, p)
  }
  setList(listaNueva: Boleta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number){
    return this.httpClient.get<Boleta>(`${this.url}/${id}`)
  }
  
  update(c:Boleta){
    return this.httpClient.put(this.url,c)
  }

  eliminar(id:number){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
