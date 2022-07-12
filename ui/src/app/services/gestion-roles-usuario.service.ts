import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { Acciones } from '../models/Gestion-acciones/Acciones'; 
import {AccionesWrapper} from "./wrappers/AccionesWrapper";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import { MostrarRolUsuarioWrapper } from './wrappers/MostrarRolUsuarioWrapper';
import { Roles_Usuarios } from '../models/Gestion-roles-usuario/Roles_Usuarios'; 
import { InfoAddRUWrapper } from './wrappers/InfoAddRUWrapper'; 
import { Info_Add_Roles_U } from '../models/Gestion-roles-usuario/Info-Add-Roles-U';
import {AddAccionWrapper} from "./wrappers/AddAccionWrapper";
import {DeleteAccionWrapper} from "./wrappers/DeleteAccionWrapper";

@Injectable({
  providedIn: 'root'
})
export class GestionRolesUsuarioService {

  constructor(private readonly http: HttpClient) { }

  public mostrarTodos(): Observable<Roles_Usuarios> {
    return this.http.post<MostrarRolUsuarioWrapper>(`${environment.api}/?controller=rol_usuario&action=showall`, null)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES;
              default:
                throw new Error();
            }
          }
        )
      );
  }

  public info_add(): Observable<Info_Add_Roles_U> {
    return this.http.post<InfoAddRUWrapper>(`${environment.api}/?controller=rol_usuario&action=info_add`, null)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES;
              default:
                throw new Error();
            }
          }
        )
      );
  }

  public addRolUsuario(usuario_id: string, rol_id: string) {
    var formData: any = new FormData();
    formData.append("usuario", usuario_id);
    formData.append("rol", rol_id);

    return this.http.post<AddAccionWrapper>(`${environment.api}/?controller=rol_usuario&action=add`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES.resultado;
              case '4002':
                throw new Error('4002');
              case '4004':
                throw new Error('4004');
              default:
                throw new Error(resultado.CODE);
            }
          }
        )
      );
  }

  public deleteRolUsuario(usuario_id: string, rol_id: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("usuario", usuario_id);
    formData.append("rol", rol_id);

    return this.http.post<DeleteAccionWrapper>(`${environment.api}/?controller=rol_usuario&action=delete`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return true;
              default:
                throw new Error();
            }
          }
        )
      );
  }
}
