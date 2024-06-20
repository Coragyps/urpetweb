import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Billetera } from '../models/billetera';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class BilleteraService {
  private url=`${base_url}/billetera`
  private listaCambio=new Subject<Billetera[]>()
  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get<Billetera[]>(this.url)
  }
  insert(p:Billetera){
    return this.httpClient.post(this.url, p)
  }
  setList(listaNueva: Billetera[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number){
    return this.httpClient.get<Billetera>(`${this.url}/${id}`)
  }
  
  update(c:Billetera){
    return this.httpClient.put(this.url,c)
  }

  eliminar(id:number){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
