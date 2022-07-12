import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Centros } from '../models/Gestion-centros/Centros';
import { MostrarCentrosWrapper } from './wrappers/gestion-centros/MostrarCentrosWrapper';
import { Centro } from '../models/Gestion-centros/Centro';
import { DeleteCentrosWrapper } from './wrappers/gestion-centros/DeleteCentrosWrapper';
import { CentrosWrapper } from './wrappers/gestion-centros/CentrosWrapper';

import { AddECentrosWrapper } from './wrappers/gestion-centros/AddCentrosWrapper';
import { EditCentrosWrapper } from './wrappers/gestion-centros/EditCentrosWrapper';
import { Universidades } from '../models/Gestion-Universidades/Universidades';
import { UniversidadesWrapper } from './wrappers/gestion-universidades/UniversidadesWrapper';
@Injectable({
  providedIn: 'root'
})
export class GestionCentrosService {

  constructor(private readonly http: HttpClient) { }

  public mostrarTodos(): Observable<Centros> {
    return this.http.post<MostrarCentrosWrapper>(`${environment.api}/?controller=centros&action=showall`, null)
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
  public deleteCentro(id: String): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<DeleteCentrosWrapper>(`${environment.api}/?controller=centros&action=delete`, formData)
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
  public info_add(): Observable<Universidades> {
    return this.http.post<UniversidadesWrapper>(`${environment.api}/?controller=centros&action=info_add`, null)
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

  public addCentro(nombre: string, ciudad: string, responsable: string, universidad: string): Observable<string> {
    var formData: any = new FormData();
    formData.append("nombre", nombre);
    formData.append("ciudad", ciudad);
    formData.append("universidad", universidad);
    formData.append("responsable", responsable);

    return this.http.post<AddECentrosWrapper>(`${environment.api}/?controller=centros&action=add`, formData)
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

  public show(id: string): Observable<Centro> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<MostrarCentrosWrapper>(`${environment.api}/?controller=centros&action=show`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES.centros[0];
              case '4005':
                throw new Error('4005');
              default:
                throw new Error();
            }
          }
        )
      );
  }

  public editCentro(id: string, nombre: string, ciudad: string, responsable: string, universidad: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("ciudad", ciudad);
    formData.append("responsable", responsable);
    formData.append("universidad", universidad);

    return this.http.post<EditCentrosWrapper>(`${environment.api}/?controller=centros&action=edit`, formData)
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
