import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url=`${base_url}/usuario`;
  private listaCambio=new Subject<Usuario[]>()
  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Usuario[]>(this.url)
  }
  
  insert(p:Usuario){
    return this.http.post(this.url,p)
  }
  
  setList(listaNueva: Usuario[]){
    this.listaCambio.next(listaNueva)
  }
  
  getList(){
    return this.listaCambio.asObservable()
  }
  
  listId(id: number){
    return this.http.get<Usuario>(`${this.url}/${id}`)
  }
  
  update(c:Usuario){
    return this.http.put(this.url,c)
  }

  eliminar(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  existsByUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/?username=${username}`);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.url}/detalle?username=${username}`);
  }

  insertwithrol(p:Usuario, rol:string) {
    return this.http.post(`${this.url}/?rol=${rol}`,p)
  }
}
