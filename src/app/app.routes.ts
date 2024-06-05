import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditausuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';
export const routes: Routes = [
  {
    path: 'usuarios', component:UsuarioComponent,
    children:[
      {
        path: 'crear', component: CreaeditausuarioComponent
      },
      {
        path: 'editar/:id', component: CreaeditausuarioComponent
      }
    ]
  }
];
