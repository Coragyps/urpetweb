import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditausuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';
import { BilleteraComponent } from './components/billetera/billetera.component';
import { CreaeditabilleteraComponent } from './components/billetera/creaeditabilletera/creaeditabilletera.component';
import { MembresiaComponent } from './components/membresia/membresia.component';
import { CreaeditamembresiaComponent } from './components/membresia/creaeditamembresia/creaeditamembresia.component';
import { PaseadorComponent } from './components/paseador/paseador.component';
import { CreaeditapaseadorComponent } from './components/paseador/creaeditapaseador/creaeditapaseador.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { CreaeditareservaComponent } from './components/reserva/creaeditareserva/creaeditareserva.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { CreaeditamascotaComponent } from './components/mascota/creaeditamascota/creaeditamascota.component';
import { BoletaComponent } from './components/boleta/boleta.component';
import { CreaeditaboletaComponent } from './components/boleta/creaeditaboleta/creaeditaboleta.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { CreaeditacomentarioComponent } from './components/comentario/creaeditacomentario/creaeditacomentario.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { segGuard } from './guard/seguridad.guard';
export const routes: Routes = [
	{
		path: '',
		component: LandingComponent,
	},
  {
    path: 'usuarios', component:UsuarioComponent,
    children:[
      {path: 'crear', component: CreaeditausuarioComponent},
      {path: 'editar/:id', component: CreaeditausuarioComponent}
    ],
    canActivate: [segGuard],
  },
  {
    path: 'billeteras', component:BilleteraComponent,
    children:[
      {path:'crear',component:CreaeditabilleteraComponent},
      {path:'editar/:id',component: CreaeditabilleteraComponent}
    ],
    canActivate: [segGuard],
  },
  {
    path: 'membresias', component:MembresiaComponent,
    children:[
      {path:'crear',component:CreaeditamembresiaComponent},
      {path:'editar/:id',component: CreaeditamembresiaComponent}
    ],
    canActivate: [segGuard],
  },
  {
    path: 'paseadores', component:PaseadorComponent,
    children:[
      {path:'crear',component:CreaeditapaseadorComponent},
      {path:'editar/:id',component: CreaeditapaseadorComponent}
    ],
    canActivate: [segGuard],
  },
  {
    path: 'mascotas', component:MascotaComponent,
    children:[
      {path:'crear',component:CreaeditamascotaComponent},
      {path:'editar/:id',component: CreaeditamascotaComponent}
    ],
    canActivate: [segGuard],
  },
  {
    path: 'reservas', component:ReservaComponent,
    children:[
      {path:'crear',component:CreaeditareservaComponent},
      {path:'editar/:id',component: CreaeditareservaComponent}
    ],
    canActivate: [segGuard],
  },
  {
    path: 'boletas', component:BoletaComponent,
    children:[
      {path:'crear',component:CreaeditaboletaComponent},
      {path:'editar/:id',component: CreaeditaboletaComponent}
    ],
    canActivate: [segGuard],
  },
  {
    path: 'comentarios', component:ComentarioComponent,
    children:[
      {path:'crear',component:CreaeditacomentarioComponent},
      {path:'editar/:id',component: CreaeditacomentarioComponent}
    ],
    canActivate: [segGuard],
  },
  {
    path: 'inicio',
    component: HomeComponent,
    canActivate: [segGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];