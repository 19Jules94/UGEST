import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Roles } from '../models/Gestion-roles/Roles';
import {RolesWrapper} from "./wrappers/RolesWrapper";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import { Rol } from '../models/Gestion-roles/Rol';
import {DeleteRolWrapper} from "./wrappers/DeleteRolWrapper";
import {AddRolWrapper} from "./wrappers/AddRolWrapper";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class GestionRolesService {

  constructor(private readonly http: HttpClient) { }
  public mostrarTodos(): Observable<Roles> {
    return this.http.post<RolesWrapper>(`${environment.api}/?controller=roles&action=showall`, null)
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

  public addRol(nombre: string) {
    var formData: any = new FormData();
    formData.append("nombre", nombre);

    return this.http.post<AddRolWrapper>(`${environment.api}/?controller=roles&action=add`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES.resultado;
              case '4002':
                throw new Error('4002');
              default:
                throw new Error();
            }
          }
        )
      );
  }

  public deleteRol(id: String): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<DeleteRolWrapper>(`${environment.api}/?controller=roles&action=delete`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return true;
              case '4001':
                throw new Error('4001');
              default:
                throw new Error();
            }
          }
        )
      );
  }
}
