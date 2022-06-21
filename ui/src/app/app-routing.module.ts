import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from "./components/inicio/inicio.component";
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';

const routes: Routes = [
{path: 'inicio', component: InicioComponent,canActivate: [NotAuthenticatedGuard] }, 
{path: 'iniciar-sesion', component: IniciarSesionComponent,canActivate: [NotAuthenticatedGuard] }, 
{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
{ path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
