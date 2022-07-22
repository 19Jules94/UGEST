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
import { MostrarProfesoresComponent } from './components/gestion-profesores/mostrar-profesores/mostrar-profesores.component';
import { AddProfesorComponent } from './components/gestion-profesores/add-profesor/add-profesor.component';
import { EditProfesorComponent } from './components/gestion-profesores/edit-profesor/edit-profesor.component';
import { MostrarEdificiosComponent } from './components/gestion-edificios/mostrar-edificios/mostrar-edificios.component';
import { EditEdificioComponent } from './components/gestion-edificios/edit-edificio/edit-edificio.component';
import { AddEdificioComponent } from './components/gestion-edificios/add-edificio/add-edificio.component';
import { AddCentroComponent } from './components/gestion-centros/add-centro/add-centro.component';
import { MostrarCentroComponent } from './components/gestion-centros/mostrar-centro/mostrar-centro.component';
import { EditCentroComponent } from './components/gestion-centros/edit-centro/edit-centro.component';
import { AddUniversidadComponent } from './components/gestion-universidades/add-universidad/add-universidad.component';
import { MostrarUniversidadComponent } from './components/gestion-universidades/mostrar-universidad/mostrar-universidad.component';
import { EditUniversidadComponent } from './components/gestion-universidades/edit-universidad/edit-universidad.component';
import { AddDepartamentoComponent } from './components/gestion-departamentos/add-departamento/add-departamento.component';
import { MostrarDepartamentosComponent } from './components/gestion-departamentos/mostrar-departamentos/mostrar-departamentos.component';
import { EditDepartamentoComponent } from './components/gestion-departamentos/edit-departamento/edit-departamento.component';
import { MostrarRolesUsuariosComponent } from './components/gestion-roles-usuario/mostrar-roles-usuarios/mostrar-roles-usuarios.component';
import { AddRolUsuarioComponent } from './components/gestion-roles-usuario/add-rol-usuario/add-rol-usuario.component';
import { MostrarTitulacionesComponent } from './components/gestion-titulaciones/mostrar-titulaciones/mostrar-titulaciones.component';
import { AddTitulacionesComponent } from './components/gestion-titulaciones/add-titulaciones/add-titulaciones.component';
import { EditTitulacionesComponent } from './components/gestion-titulaciones/edit-titulaciones/edit-titulaciones.component';
import { MostrarAsignaturasComponent } from './components/gestion-asignaturas/mostrar-asignaturas/mostrar-asignaturas.component';
import { AddAsignaturasComponent } from './components/gestion-asignaturas/add-asignaturas/add-asignaturas.component';
import { EditAsignaturasComponent } from './components/gestion-asignaturas/edit-asignaturas/edit-asignaturas.component';
import { MostrarEspaciosComponent } from './components/gestion-espacios/mostrar-espacios/mostrar-espacios.component';
import { AddEspacioComponent } from './components/gestion-espacios/add-espacio/add-espacio.component';
import { EditEspacioComponent } from './components/gestion-espacios/edit-espacio/edit-espacio.component';
import { MostrarGruposComponent } from './components/gestion-grupos/mostrar-grupos/mostrar-grupos.component';
import { AddGrupoComponent } from './components/gestion-grupos/add-grupo/add-grupo.component';
import { EditGrupoComponent } from './components/gestion-grupos/edit-grupo/edit-grupo.component';
import { MostrarHorariosComponent } from './components/gestion-horarios/mostrar-horarios/mostrar-horarios.component';
import { AddHorarioComponent } from './components/gestion-horarios/add-horario/add-horario.component';
import { EditHorarioComponent } from './components/gestion-horarios/edit-horario/edit-horario.component';
import { MostrarTutoriasComponent } from './components/gestion-tutorias/mostrar-tutorias/mostrar-tutorias.component';
import { AddTutoriaComponent } from './components/gestion-tutorias/add-tutoria/add-tutoria.component';
import { EditTutoriaComponent } from './components/gestion-tutorias/edit-tutoria/edit-tutoria.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { TestComponent } from './components/test/test.component';
import { GestionPDAComponent } from './components/gestion-pda/gestion-pda.component';
import { GestionPODComponent } from './components/gestion-pod/gestion-pod.component';
import { GestionPDAGuard } from 'src/guards/gestion-pda.guard';
import { GestionPODGuard } from 'src/guards/gestion-pod.guard';

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
  {path: 'panel-principal/gestion-aacademico', redirectTo: '/panel-principal/gestion-aacademico/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-usuarios/add', component: AddUsuarioComponent, canActivate: []},
  {path: 'panel-principal/gestion-usuarios/showall', component: MostrarUsuariosComponent, canActivate: []},
  {path: 'panel-principal/gestion-usuarios/edit/:dni', component: EditUsuarioComponent, canActivate: []},
  {path: 'panel-principal/gestion-usuarios', redirectTo: '/panel-principal/gestion-usuarios/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-profesores/add', component: AddProfesorComponent, canActivate: []},
  {path: 'panel-principal/gestion-profesores/showall', component: MostrarProfesoresComponent, canActivate: []},
  {path: 'panel-principal/gestion-profesores/edit/:dni', component: EditProfesorComponent, canActivate: []},
  {path: 'panel-principal/gestion-profesores', redirectTo: '/panel-principal/gestion-profesores/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-edificios/add', component: AddEdificioComponent, canActivate: []},
  {path: 'panel-principal/gestion-edificios/showall', component: MostrarEdificiosComponent, canActivate: []},
  {path: 'panel-principal/gestion-edificios/edit/:id', component: EditEdificioComponent, canActivate: []},
  {path: 'panel-principal/gestion-edificios', redirectTo: '/panel-principal/gestion-edificios/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-centros/add', component: AddCentroComponent, canActivate: []},
  {path: 'panel-principal/gestion-centros/showall', component: MostrarCentroComponent, canActivate: []},
  {path: 'panel-principal/gestion-centros/edit/:id', component: EditCentroComponent, canActivate: []},
  {path: 'panel-principal/gestion-centros', redirectTo: '/panel-principal/gestion-centros/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-universidades/add', component: AddUniversidadComponent, canActivate: []},
  {path: 'panel-principal/gestion-universidades/showall', component: MostrarUniversidadComponent, canActivate: []},
  {path: 'panel-principal/gestion-universidades/edit/:id', component: EditUniversidadComponent, canActivate: []},
  {path: 'panel-principal/gestion-universidades', redirectTo: '/panel-principal/gestion-universidades/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-departamentos/add', component: AddDepartamentoComponent, canActivate: []},
  {path: 'panel-principal/gestion-departamentos/showall', component: MostrarDepartamentosComponent, canActivate: []},
  {path: 'panel-principal/gestion-departamentos/edit/:id', component: EditDepartamentoComponent, canActivate: []},
  {path: 'panel-principal/gestion-departamentos', redirectTo: '/panel-principal/gestion-departamentos/showall', pathMatch: 'full'},
  
  {path: 'panel-principal/gestion-roles-usuarios/add', component: AddRolUsuarioComponent, canActivate: []},
  {path: 'panel-principal/gestion-roles-usuarios/showall', component: MostrarRolesUsuariosComponent, canActivate: []},
  {path: 'panel-principal/gestion-roles-usuarios', redirectTo: '/panel-principal/gestion-departamentos/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-titulaciones/add', component: AddTitulacionesComponent, canActivate: []},
  {path: 'panel-principal/gestion-titulaciones/showall', component: MostrarTitulacionesComponent, canActivate: []},
  {path: 'panel-principal/gestion-titulaciones/edit/:id', component: EditTitulacionesComponent, canActivate: []},
  {path: 'panel-principal/gestion-titulaciones', redirectTo: '/panel-principal/gestion-titulaciones/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-asignaturas/add', component: AddAsignaturasComponent, canActivate: []},
  {path: 'panel-principal/gestion-asignaturas/showall', component: MostrarAsignaturasComponent, canActivate: []},
  {path: 'panel-principal/gestion-asignaturas/edit/:id', component: EditAsignaturasComponent, canActivate: []},
  {path: 'panel-principal/gestion-asignaturas', redirectTo: '/panel-principal/gestion-titulaciones/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-espacios/add', component: AddEspacioComponent, canActivate: []},
  {path: 'panel-principal/gestion-espacios/showall', component: MostrarEspaciosComponent, canActivate: []},
  {path: 'panel-principal/gestion-espacios/edit/:id', component: EditEspacioComponent, canActivate: []},
  {path: 'panel-principal/gestion-espacios', redirectTo: '/panel-principal/gestion-espacios/showall', pathMatch: 'full'},


  
  {path: 'panel-principal/gestion-grupos/add', component: AddGrupoComponent, canActivate: []},
  {path: 'panel-principal/gestion-grupos/showall', component: MostrarGruposComponent, canActivate: []},
  {path: 'panel-principal/gestion-grupos/edit/:id', component: EditGrupoComponent, canActivate: []},
  {path: 'panel-principal/gestion-grupos', redirectTo: '/panel-principal/gestion-grupos/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-horarios/add', component: AddHorarioComponent, canActivate: []},
  {path: 'panel-principal/gestion-horarios/showall', component: MostrarHorariosComponent, canActivate: []},
  {path: 'panel-principal/gestion-horarios/edit/:id', component: EditHorarioComponent, canActivate: []},
  {path: 'panel-principal/gestion-horarios', redirectTo: '/panel-principal/gestion-horarios/showall', pathMatch: 'full'},

  {path: 'panel-principal/gestion-tutorias/add', component: AddTutoriaComponent, canActivate: []},
  {path: 'panel-principal/gestion-tutorias/showall', component: MostrarTutoriasComponent, canActivate: []},
  {path: 'panel-principal/gestion-tutorias/edit/:id', component: EditTutoriaComponent, canActivate: []},
  {path: 'panel-principal/gestion-tutorias', redirectTo: '/panel-principal/gestion-tutorias/showall', pathMatch: 'full'},

  {path: 'panel-principal/calendario', component: CalendarioComponent, canActivate: []},
  {path: 'test', component: TestComponent, canActivate: [NotAuthenticatedGuard]},

    {path: 'panel-principal/gestion-pda', component: GestionPDAComponent, canActivate: [GestionPDAGuard]},
  {path: 'panel-principal/gestion-pod', component: GestionPODComponent, canActivate: [GestionPODGuard]},

  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
