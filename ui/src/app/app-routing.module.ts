import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InicioComponent} from "./components/inicio/inicio.component";
import { NotAuthenticatedGuard } from 'src/guards/not-authenticated.guard';
import {PanelPrincipalComponent} from "./components/panel-principal/panel-principal.component";
import {AuthenticatedGuard} from "src/guards/authenticated.guard";



const routes: Routes = [
  {path: 'inicio', component: InicioComponent, canActivate: [NotAuthenticatedGuard]},
  {path: 'panel-principal', component: PanelPrincipalComponent, canActivate: [AuthenticatedGuard]},  
  {path: 'panel-principal/gestion-acciones', redirectTo: '/panel-principal/gestion-acciones/showall', pathMatch: 'full'},


  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
