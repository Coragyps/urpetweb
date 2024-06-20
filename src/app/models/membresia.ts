import { Usuario } from "./usuario";

export class Membresia
{
    membresiaId:number =0
    membresiaFechaInicio: Date = new Date(Date.now());
    membresiaFechaFin: Date = new Date(Date.now());
    membresiaEstado:string=""
    usuario: Usuario=new Usuario()
}