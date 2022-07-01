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

  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
