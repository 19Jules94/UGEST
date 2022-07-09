import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Edificios } from '../models/Gestion-edificios/Edificios';
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import { Espacios } from '../models/Gestion-espacios/Espacios';
import { MostrarEspaciosWrapper } from './wrappers/gestion-espacios/MostrarEspaciosWrapper';
import { DeleteEspacioWrapper } from './wrappers/gestion-espacios/DeleteEspacioWrapper';
import { AddEspaciosWrapper } from './wrappers/gestion-espacios/AddEspaciosWrapper';

import { Espacio } from '../models/Gestion-espacios/Espacio';
import { InfoAddEspaciosWrapper } from './wrappers/gestion-espacios/InfoAddEspacioWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionEspacioService {
  private entity:string;

  constructor(private readonly http: HttpClient) {
    this.entity = "espacios"
  }

  public mostrarTodos(): Observable<Espacios> {
    return this.http.post<MostrarEspaciosWrapper>(`${environment.api}/?controller=espacios&action=showall`, null)
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

  public deleteEspacio(id: String): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<DeleteEspacioWrapper>(`${environment.api}/?controller=espacios&action=delete`, formData)
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

  public info_add(): Observable<Edificios> {
    return this.http.post<InfoAddEspaciosWrapper>(`${environment.api}/?controller=espacios&action=info_add`, null)
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

  public addEspacio(nombre: string, tipo: string, edificio: string): Observable<string> {
    var formData: any = new FormData();
    formData.append("nombre", nombre);
    formData.append("tipo", tipo);
    formData.append("edificio", edificio);

    return this.http.post<AddEspaciosWrapper>(`${environment.api}/?controller=espacios&action=add`, formData)
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

  public mostrarEspacio(id: String): Observable<Espacio> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<MostrarEspaciosWrapper>(`${environment.api}/?controller=espacios&action=show`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES.espacios[0];
              case '4005':
                throw new Error('4005');
              default:
                throw new Error();
            }
          }
        )
      );
  }

  public edit(id: string, nombre: string, tipo: string, edificio: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("tipo", tipo);
    formData.append("edificio", edificio);

    return this.http.post<AddEspaciosWrapper>(`${environment.api}/?controller=espacio&action=edit`, formData)
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
