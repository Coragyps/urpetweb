import { Injectable } from '@angular/core';
import { Membresia } from '../models/membresia';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {
  private url=`${base_url}/membresia`
  private listaCambio=new Subject<Membresia[]>()
  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get<Membresia[]>(this.url)
  }
  insert(p:Membresia){
    return this.httpClient.post(this.url, p)
  }
  setList(listaNueva: Membresia[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number){
    return this.httpClient.get<Membresia>(`${this.url}/${id}`)
  }
  
  update(c:Membresia){
    return this.httpClient.put(this.url,c)
  }

  eliminar(id:number){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
