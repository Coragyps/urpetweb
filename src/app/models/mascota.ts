import { Usuario } from "./usuario"

export class Mascota
{
	mascotaId:number=0
    macotaNombre:string=""
    mascotaFoto:string=""
    mascotaRaza:string=""
    mascotaEdad:number=0
    mascotaSexo:string=""
    mascotaTamaño:string=""
    mascotaHabilitado: boolean = true
    usuario: Usuario=new Usuario()
}