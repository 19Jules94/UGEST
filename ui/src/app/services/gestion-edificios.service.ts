import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Edificios } from '../models/Gestion-edificios/Edificios';
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import { MostrarEdificiosWrapper } from './wrappers/gestion-edificios/MostrarEdificiosWrapper';
import { DeleteEdificiosWrapper } from './wrappers/gestion-edificios/DeleteEdificiosWrapper';
import { AddEdificiosWrapper } from './wrappers/gestion-edificios/AddEdificiosWrapper';
import {InfoAddEdificiosWrapper} from "./wrappers/gestion-edificios/InfoAddEdificiosWrapper";
import { Edificio } from '../models/Gestion-edificios/Edificio';
import { AddUniversidadesWrapper } from './wrappers/AddUniversidadWrapper';
import { Universidades} from '../models/Gestion-Universidades/Universidades';
import { EditEdificiosWrapper } from './wrappers/gestion-edificios/EditEdificiosWrapper';
@Injectable({
  providedIn: 'root'
})
export class GestionEdificiosService {

  constructor(private readonly http: HttpClient) { }

  public mostrarTodos(): Observable<Edificios> {
    return this.http.post<MostrarEdificiosWrapper>(`${environment.api}/?controller=edificios&action=showall`, null)
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
  public deleteEdificio(id: String): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<DeleteEdificiosWrapper>(`${environment.api}/?controller=edificios&action=delete`, formData)
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
    return this.http.post<InfoAddEdificiosWrapper>(`${environment.api}/?controller=edificios&action=info_add`, null)
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

  public addEdificio(nombre: string, ubicacion: string, universidad: string): Observable<string> {
    var formData: any = new FormData();
    formData.append("nombre", nombre);
    formData.append("ubicacion", ubicacion);
    formData.append("universidad", universidad);

    return this.http.post<AddUniversidadesWrapper>(`${environment.api}/?controller=edificios&action=add`, formData)
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

  public show(id: string): Observable<Edificio> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<MostrarEdificiosWrapper>(`${environment.api}/?controller=edificios&action=show`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES.edificios[0];
              case '4005':
                throw new Error('4005');
              default:
                throw new Error();
            }
          }
        )
      );
  }

  public editEdificio(id: string, nombre: string, ubicacion: string, universidad: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("ubicacion", ubicacion);
    formData.append("universidad", universidad);

    return this.http.post<EditEdificiosWrapper>(`${environment.api}/?controller=edificios&action=edit`, formData)
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
