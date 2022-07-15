import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grupo } from '../models/Gestion-grupos/Grupo';
import { Grupos } from '../models/Gestion-grupos/Grupos';
import { AddGruposWrapper } from './wrappers/AddGruposWrapper';
import { GruposWrapper } from './wrappers/GruposWrapper';
import { InfoAddGruposWrapper } from './wrappers/InfoAddGruposWrapper';
import { MostrarGruposWrapper } from './wrappers/MostrarGruposWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionGruposService {

  constructor(private readonly http: HttpClient) { }

  public mostrartodos(): Observable<Grupos> {
    return this.http.post<MostrarGruposWrapper>(`${environment.api}/?controller=grupos&action=showall`, null)
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


  public addGrupo(nombre: string, codigo: string,
    tipo: string, horas: string, anho: string,
    titulacion: string, asignatura: string 
  ): Observable<string> {

    var formData: any = new FormData();
    formData.append("nombre", nombre);
    formData.append("codigo", codigo); 
    formData.append("tipo", tipo);
    formData.append("horas", horas);
    formData.append("asignatura", asignatura);
    formData.append("titulacion", titulacion);
    formData.append("anho", anho); 


    return this.http.post<AddGruposWrapper>(`${environment.api}/?controller=grupos&action=add`, formData)
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
              throw new Error();
          }

        }
        )
      );
  }


  public editGrupo(id: string, nombre: string, codigo: string,
    tipo: string, horas: string, anho: string,
    titulacion: string, asignatura: string 
  ): Observable<boolean> {

    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("codigo", codigo); 
    formData.append("tipo", tipo);
    formData.append("horas", horas);
    formData.append("asignatura", asignatura);
    formData.append("titulacion", titulacion);
    formData.append("anho", anho); 


    return this.http.post<GruposWrapper>(`${environment.api}/?controller=grupos&action=edit`, formData)
      .pipe(
        map(resultado => {
          switch (resultado.CODE) {
            case '200':
              return true;
            case '4002':
              throw new Error('4002');
            case '4004':
              throw new Error('4004');
            default:
              throw new Error();
          }

        }
        )
      );
  }

  public show(id: string): Observable<Grupo> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<MostrarGruposWrapper>(`${environment.api}/?controller=grupos&action=show`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES.grupos[0];
              case '4005':
                throw new Error('4005');
              default:
                throw new Error();
            }
          }
        )
      );
  }

  public deleteGrupo(id: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<GruposWrapper>(`${environment.api}/?controller=grupos&action=delete`, formData)
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

  public info_add(): Observable<any> {
    return this.http.post<InfoAddGruposWrapper>(`${environment.api}/?controller=grupos&action=info_add`, null)
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
