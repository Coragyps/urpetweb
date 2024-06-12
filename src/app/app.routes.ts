import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditausuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';
import { segGuard } from './guard/seguridad.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
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
    path: 'homes',
    component: HomeComponent,
    canActivate: [segGuard],
  },
];
