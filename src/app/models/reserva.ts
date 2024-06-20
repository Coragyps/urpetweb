import { Mascota } from "./mascota";
import { Paseador } from "./paseador";

export class Reserva 
{
	reservaId:number =0
    reservaEstado:string=""
    reservaFecha: Date = new Date(Date.now());
    reservaHoraInicio: string =""
    reservaHoraFin: string =""
    paseador: Paseador=new Paseador()
    mascota: Mascota=new Mascota()
}