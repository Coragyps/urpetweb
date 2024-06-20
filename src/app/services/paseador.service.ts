import { Injectable } from '@angular/core';
import { Paseador } from '../models/paseador';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class PaseadorService {
  private url=`${base_url}/paseador`
  private listaCambio=new Subject<Paseador[]>()

  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get<Paseador[]>(this.url)
  }
  insert(p:Paseador){
    return this.httpClient.post(this.url, p)
  }
  setList(listaNueva: Paseador[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number){
    return this.httpClient.get<Paseador>(`${this.url}/${id}`)
  }
  
  update(c:Paseador){
    return this.httpClient.put(this.url,c)
  }

  eliminar(id:number){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
