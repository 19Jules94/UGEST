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
const routes: Routes = [
  {path: 'inicio', component: InicioComponent, canActivate: [NotAuthenticatedGuard]},
  {path: 'panel-principal', component: PanelPrincipalComponent, canActivate: [AuthenticatedGuard]},  
  {path: 'perfil', component:PerfilComponent,canActivate:[AuthenticatedGuard]},
  {path: 'perfil/edit', component: ModificarPerfilComponent, canActivate: [AuthenticatedGuard]},
  {path: 'panel-principal/gestion-acciones/showall', component: MostrarAccionesComponent, canActivate: [GestionAccionesMTGuard]},
  {path: 'panel-principal/gestion-acciones', redirectTo: '/panel-principal/gestion-acciones/showall', pathMatch: 'full'},
  {path: 'panel-principal/gestion-acciones/add',component: AddAccionComponent,canActivate: [GestionAccionesAddGuard]},
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
