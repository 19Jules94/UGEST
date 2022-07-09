import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permisos } from '../models/Gestion-permisos/Permisos';
import { PermisosWrapper } from './wrappers/PermisosWrapper';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { AuthenticationService } from './authentication.service';
import { Permiso } from '../models/Gestion-permisos/Permiso';
import { DeletePermisoWrapper } from './wrappers/DeletePermisoWrapper';
import { AddPermisoWrapper } from './wrappers/AddPermisoWrapper';
import { Info_Add_Roles_U } from '../models/Gestion-roles-usuario/Info-Add-Roles-U';
import { InfoAddRUWrapper } from './wrappers/InfoAddRUWrapper';
import { Info_Add_Permisos } from '../models/Gestion-permisos/Info-Add-Permisos';
import { InfoAddPermisosWrapper } from './wrappers/InfoAddPermisosWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionPermisosService {

  constructor(private readonly http: HttpClient) { }
  public mostrarTodos(): Observable<Permisos> {
    return this.http.post<PermisosWrapper>(`${environment.api}/?controller=permisos&action=showall`, null)
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

  public deletePermiso(rol : string, funcionalidad : string, accion : string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("rol", rol);
    formData.append("funcionalidad", funcionalidad);
    formData.append("accion",accion);

    return this.http.post<DeletePermisoWrapper>(`${environment.api}/?controller=permisos&action=delete`, formData)
      .pipe(
        map(resultado => {

          switch (resultado.CODE) {
            case '200':
              return true;
            case '4001':
              throw new Error('4001');
            default:
              throw new Error(resultado.CODE);
          }
        }
        )
      );
  }

  public addPermiso(rol: string, funcionalidad: string, accion: string) {
    var formData: any = new FormData();
    formData.append("rol", rol);
    formData.append("funcionalidad", funcionalidad);
    formData.append("accion", accion);

    return this.http.post<AddPermisoWrapper>(`${environment.api}/?controller=permisos&action=add`, formData)
      .pipe(
        map(resultado => {
          switch (resultado.CODE) {
            case '200':
              return resultado.RESOURCES.resultado;
            case '4002':
              throw new Error("4002");
            case '4004':
              throw new Error("4004");
            default:
              throw new Error(resultado.CODE);
          }
        }
        )
      );
  }

  public info_add(): Observable<Info_Add_Permisos> {
    return this.http.post<InfoAddPermisosWrapper>(`${environment.api}/?controller=permisos&action=info_add`, null)
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
}
