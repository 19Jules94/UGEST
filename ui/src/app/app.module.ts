import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PanelPrincipalComponent } from './components/panel-principal/panel-principal.component';

import { JwtAuthenticationInterceptor } from './lifecycle/jwt-authentication.interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './utils/FilterPipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ModificarPerfilComponent } from './components/modificar-perfil/modificar-perfil.component';
import { MostrarAccionesComponent } from './components/gestion-acciones/mostrar-acciones/mostrar-acciones.component';
import { AddAccionComponent } from './components/gestion-acciones/add-accion/add-accion.component';
import { MostrarFuncionalidadesComponent } from './components/gestion-funcionalidades/mostrar-funcionalidades/mostrar-funcionalidades.component';
import { AddFuncionalidadComponent } from './components/gestion-funcionalidades/add-funcionalidad/add-funcionalidad.component';
import { AddRolComponent } from './components/gestion-roles/add-rol/add-rol.component';
import { MostrarRolesComponent } from './components/gestion-roles/mostrar-roles/mostrar-roles.component';
import { AddPermisoComponent } from './components/gestion-permisos/add-permiso/add-permiso.component';
import { MostrarPermisosComponent } from './components/gestion-permisos/mostrar-permisos/mostrar-permisos.component';
import { AddAAcademicoComponent } from './components/gestion-aacademicos/add-aacademico/add-aacademico.component';
import { MostrarAAcademicoComponent } from './components/gestion-aacademicos/mostrar-aacademico/mostrar-aacademico.component';
import { MostrarUsuariosComponent } from './components/gestion-usuarios/mostrar-usuarios/mostrar-usuarios.component';
import { AddUsuarioComponent } from './components/gestion-usuarios/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './components/gestion-usuarios/edit-usuario/edit-usuario.component';
import { AddProfesorComponent } from './components/gestion-profesores/add-profesor/add-profesor.component';
import { MostrarProfesoresComponent } from './components/gestion-profesores/mostrar-profesores/mostrar-profesores.component';
import { EditProfesorComponent } from './components/gestion-profesores/edit-profesor/edit-profesor.component';
import { MostrarEdificiosComponent } from './components/gestion-edificios/mostrar-edificios/mostrar-edificios.component';
import { AddEdificioComponent } from './components/gestion-edificios/add-edificio/add-edificio.component';
import { EditEdificioComponent } from './components/gestion-edificios/edit-edificio/edit-edificio.component';
import { EditCentroComponent } from './components/gestion-centros/edit-centro/edit-centro.component';
import { AddCentroComponent } from './components/gestion-centros/add-centro/add-centro.component';
import { MostrarCentroComponent } from './components/gestion-centros/mostrar-centro/mostrar-centro.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

if (localStorage.getItem('selectedLanguage') == null) {
  localStorage.setItem('selectedLanguage', 'es');
}

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PanelPrincipalComponent,
    FilterPipe,
    PerfilComponent,
    ModificarPerfilComponent,
    MostrarAccionesComponent,
    AddAccionComponent,
    MostrarFuncionalidadesComponent,
    AddFuncionalidadComponent,
    AddRolComponent,
    MostrarRolesComponent,
    AddPermisoComponent,
    MostrarPermisosComponent,
    AddAAcademicoComponent,
    MostrarAAcademicoComponent,
    MostrarUsuariosComponent,
    AddUsuarioComponent,
    EditUsuarioComponent,
    AddProfesorComponent,
    MostrarProfesoresComponent,
    EditProfesorComponent,
    MostrarEdificiosComponent,
    AddEdificioComponent,
    EditEdificioComponent,
    EditCentroComponent,
    AddCentroComponent,
    MostrarCentroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem('selectedLanguage')!,

      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgbModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtAuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
