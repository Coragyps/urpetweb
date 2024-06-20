import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Mascota } from '../models/mascota';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private url=`${base_url}/mascota`
  private listaCambio=new Subject<Mascota[]>()

  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get<Mascota[]>(this.url)
  }
  insert(p:Mascota){
    return this.httpClient.post(this.url, p)
  }
  setList(listaNueva: Mascota[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number){
    return this.httpClient.get<Mascota>(`${this.url}/${id}`)
  }
  
  update(c:Mascota){
    return this.httpClient.put(this.url,c)
  }

  eliminar(id:number){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
