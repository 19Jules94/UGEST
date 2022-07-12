import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Universidad } from '../models/Gestion-Universidades/Universidad';
import { Universidades } from '../models/Gestion-Universidades/Universidades';
import { Usuarios } from '../models/Gestion-usuario/Usuarios';
import { AddUniversidadesWrapper } from './wrappers/AddUniversidadWrapper';
import { DeleteUniversidadesWrapper } from './wrappers/gestion-universidades/DeleteUniversidadesWrapper';
import { EditUniversidadesWrapper } from './wrappers/gestion-universidades/EditUniversidadesWrapper';
import { MostrarUniversidadesWrapper } from './wrappers/gestion-universidades/MostrarUniversidadesWrapper';
import { UniversidadesWrapper } from './wrappers/gestion-universidades/UniversidadesWrapper';
import { UsuariosWrapper } from './wrappers/UsuariosWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionUniversidadesService {

  constructor(private readonly http: HttpClient) { }

  public mostrarTodas(): Observable<Universidades> {
    return this.http.post<MostrarUniversidadesWrapper>(`${environment.api}/?controller=universidades&action=showall`, null)
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
  public deleteUniversidad(id: String): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<DeleteUniversidadesWrapper>(`${environment.api}/?controller=universidades&action=delete`, formData)
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
  public info_add(): Observable<Usuarios> {
    return this.http.post<UsuariosWrapper>(`${environment.api}/?controller=universidades&action=info_add`, null)
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

  public addUniversidad(nombre: string, ciudad: string, responsable: string): Observable<string> {
    var formData: any = new FormData();
    formData.append("nombre", nombre);
    formData.append("ciudad", ciudad);
    formData.append("responsable", responsable);

    return this.http.post<AddUniversidadesWrapper>(`${environment.api}/?controller=universidades&action=add`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES.resultado;
              case '4002':
                throw new Error('4002');
              default:
                throw new Error(resultado.CODE);
            }

          }
        )
      );
  }

  public show(id: string): Observable<Universidad> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<MostrarUniversidadesWrapper>(`${environment.api}/?controller=universidades&action=show`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES.universidades[0];
              case '4005':
                throw new Error('4005');
              default:
                throw new Error();
            }
          }
        )
      );
  }

  public editUniversidad(id: string, nombre: string, ciudad: string, responsable: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("ciudad", ciudad);
    formData.append("responsable", responsable);

    return this.http.post<EditUniversidadesWrapper>(`${environment.api}/?controller=universidades&action=edit`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return true;
              case '4002':
                throw new Error('4002');
              default:
                throw new Error(resultado.CODE);
            }
          }
        )
      );
  }
}
