import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import { AAcademicoWrapper } from './wrappers/AAcademicoWrapper';
import { AddAAcademicoWrapper } from './wrappers/AddAAcademicoWrapper';
import {BaseWrapper} from "./wrappers/BaseWrapper";
import { AAcademicos } from '../models/Gestion-AAcademico/AAcademicos';

@Injectable({
  providedIn: 'root'
})
export class GestionAacademicoService {
  private entity:string;

  constructor(private readonly http: HttpClient) {
    this.entity = "anhoacademico"
  }

  public mostrartodos(): Observable<AAcademicos> {
    return this.http.post<AAcademicoWrapper>(`${environment.api}/?controller=aacademico&action=showall`, null)
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

  public deleteAAcademico(id: String): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<AAcademicoWrapper>(`${environment.api}/?controller=aacademico&action=delete`, formData)
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

  public addAAcademico(id: string): Observable<string> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<AddAAcademicoWrapper>(`${environment.api}/?controller=aacademico&action=add`, formData)
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
}
