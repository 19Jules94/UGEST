import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InicioComponent} from "./components/inicio/inicio.component";
import { NotAuthenticatedGuard } from 'src/guards/not-authenticated.guard';
import {PanelPrincipalComponent} from "./components/panel-principal/panel-principal.component";
import {AuthenticatedGuard} from "src/guards/authenticated.guard";
import { PerfilComponent } from './components/perfil/perfil.component';
import { ModificarPerfilComponent } from './components/modificar-perfil/modificar-perfil.component';
import { MostrarAccionesComponent } from './components/gestion-acciones/mostrar-acciones/mostrar-acciones.component';
import { GestionAccionesMTGuard } from 'src/guards/gestion-acciones-mt.guard';
import { AddAccionComponent } from './components/gestion-acciones/add-accion/add-accion.component';
import { GestionAccionesAddGuard } from 'src/guards/gestion-acciones-add.guard';
import { AddFuncionalidadComponent } from './components/gestion-funcionalidades/add-funcionalidad/add-funcionalidad.component';
import { MostrarFuncionalidadesComponent } from './components/gestion-funcionalidades/mostrar-funcionalidades/mostrar-funcionalidades.component';
import { GestionFuncionalidadesMTGuard } from 'src/guards/gestion-funcionalidades-mt.guard';
import { GestionFuncionalidadesAddGuard } from 'src/guards/gestion-funcionalidades-add.guard';
import { GestionRolesAddGuard } from 'src/guards/gestion-roles-add.guard';
import { GestionRolesMostrarTodosGuard } from 'src/guards/gestion-roles-mostrar-todos.guard';
import { AddRolComponent } from './components/gestion-roles/add-rol/add-rol.component';
import { MostrarRolesComponent } from './components/gestion-roles/mostrar-roles/mostrar-roles.component';
import { MostrarPermisosComponent } from './components/gestion-permisos/mostrar-permisos/mostrar-permisos.component';
import { AddPermisoComponent } from './components/gestion-permisos/add-permiso/add-permiso.component';
import { AddAAcademicoComponent } from './components/gestion-aacademicos/add-aacademico/add-aacademico.component';
import { MostrarAAcademicoComponent } from './components/gestion-aacademicos/mostrar-aacademico/mostrar-aacademico.component';
import { MostrarUsuariosComponent } from './components/gestion-usuarios/mostrar-usuarios/mostrar-usuarios.component';
import { AddUsuarioComponent } from './components/gestion-usuarios/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './components/gestion-usuarios/edit-usuario/edit-usuario.component';
const routes: Routes = [
  {path: 'inicio', component: InicioComponent, canActivate: [NotAuthenticatedGuard]},
  {path: 'panel-principal', component: PanelPrincipalComponent, canActivate: [AuthenticatedGuard]},  
  {path: 'perfil', component:PerfilComponent,canActivate:[AuthenticatedGuard]},
  {path: 'perfil/edit', component: ModificarPerfilComponent, canActivate: [AuthenticatedGuard]},

  {path: 'panel-principal/gestion-acciones/showall', component: MostrarAccionesComponent, canActivate: [GestionAccionesMTGuard]},
  {path: 'panel-principal/gestion-acciones', redirectTo: '/panel-principal/gestion-acciones/showall', pathMatch: 'full'},
  {path: 'panel-principal/gestion-acciones/add',component: AddAccionComponent,canActivate: [GestionAccionesAddGuard]},

  {path: 'panel-principal/gestion-funcionalidades/showall', component: MostrarFuncionalidadesComponent, canActivate: [GestionFuncionalidadesMTGuard]},
  {path: 'panel-principal/gestion-funcionalidades', redirectTo: '/panel-principal/gestion-funcionalidades/showall', pathMatch: 'full'},
  {path: 'panel-principal/gestion-funcionalidades/add',component: AddFuncionalidadComponent,canActivate: [GestionFuncionalidadesAddGuard]},

  {path: 'panel-principal/gestion-roles/add', component: AddRolComponent, canActivate: [GestionRolesAddGuard]},
  {path: 'panel-principal/gestion-roles/showall', component: MostrarRolesComponent, canActivate: [GestionRolesMostrarTodosGuard]},
  {path: 'panel-principal/gestion-roles', redirectTo: '/panel-principal/gestion-roles/showall', pathMatch: 'full'},
  
  {path: 'panel-principal/gestion-permisos/add', component: AddPermisoComponent, canActivate: []},
  {path: 'panel-principal/gestion-permisos/showall', component: MostrarPermisosComponent, canActivate: []},
  {path: 'panel-principal/gestion-permisos', redirectTo: '/panel-principal/gestion-permisos/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-aacademico/add', component: AddAAcademicoComponent, canActivate: []},
  {path: 'panel-principal/gestion-aacademico/showall', component: MostrarAAcademicoComponent, canActivate: []},
  {path: 'panel-principal/gestion-aacademico', redirectTo: '/panel-principal/gestion-permisos/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-usuarios/add', component: AddUsuarioComponent, canActivate: []},
  {path: 'panel-principal/gestion-usuarios/showall', component: MostrarUsuariosComponent, canActivate: []},
  {path: 'panel-principal/gestion-usuarios/edit/:dni', component: EditUsuarioComponent, canActivate: []},
  {path: 'panel-principal/gestion-usuarios', redirectTo: '/panel-principal/gestion-usuarios/showall', pathMatch: 'full'},
 
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
