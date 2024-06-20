import { Reserva } from "./reserva";

export class Boleta
{
	boletaId:number =0
    boletaMonto:number =0
    boletaFecha: Date = new Date(Date.now());
    boletaMoneda:string=""
    boletaImpuesto:number=0
	reserva: Reserva=new Reserva()
}