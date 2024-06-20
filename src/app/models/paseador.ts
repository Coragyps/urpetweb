import { Usuario } from "./usuario";

export class Paseador
{
	paseadorId:number =0
    paseadorEstado: string =""
    paseadorHoraInicio: string =""
    paseadorHoraFin: string =""
    paseadorLatitud: number = 0
    paseadorLongitud: number = 0
    paseadorPrecio: number = 0
    paseadorSlogan: string =""
    paseadorEdad: Date = new Date(Date.now());
    paseadorValidado: boolean = true
    paseadorDescripcion: string =""
    paseadorFacebook: string =""
    paseadorInstagram: string =""
    usuario: Usuario=new Usuario()
}