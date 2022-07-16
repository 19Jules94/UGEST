import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Horario } from '../models/Gestion-horarios/Horario';
import { Horarios } from '../models/Gestion-horarios/Horarios';
import { AddHorariosWrapper } from './wrappers/AddHorariosWrapper';
import { HorariosWrapper } from './wrappers/HorariosWrapper';
import { InfoAddHorariosWrapper } from './wrappers/InfoAddHorariosWrapper';
import { MostrarHorariosWrapper } from './wrappers/MostrarHorariosWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionHorariosService {

  constructor(private readonly http: HttpClient) { }

  public mostrartodos(): Observable<Horarios> {
    return this.http.post<MostrarHorariosWrapper>(`${environment.api}/?controller=horarios&action=showall`, null)
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

  public calendar(): Observable<Horarios> {
    return this.http.post<MostrarHorariosWrapper>(`${environment.api}/?controller=horarios&action=calendar`, null)
      .pipe(
        map(resultado => {

            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES;
              default:
                throw new Error(resultado.CODE);
            }
          }
        )
      );
  }



  public addHorario(titulacion: string, anho: string,
    asignatura: string, grupo: string, profesor: string, espacio: string,
    asistencia: string, hora_inicio: string, hora_fin: string,
    dia: string, fecha: string
  ): Observable<string>  {

    var formData: any = new FormData();
    formData.append("titulacion", titulacion);
    formData.append("anho", anho);
    formData.append("asignatura", asignatura);
    formData.append("grupo", grupo);
    formData.append("profesor", profesor);
    formData.append("espacio", espacio);
    formData.append("asistencia", asistencia);
    formData.append("hora_inicio", hora_inicio);
    formData.append("hora_fin", hora_fin);
    formData.append("dia", dia);
    formData.append("fecha", fecha);


    return this.http.post<AddHorariosWrapper>(`${environment.api}/?controller=horarios&action=add`, formData)
      .pipe(
        map(resultado => {
          switch (resultado.CODE) {
           
            case '200':
              return resultado.RESOURCES.resultado;
            case '4002':
              console.log(resultado.CODE)
              throw new Error('4002');
            case '4004':
              console.log(resultado.CODE)
              throw new Error('4004');
            default:
              console.log(resultado.CODE)
              throw new Error();
              
          }

        }
        )
      );
  }


  public editHorario(id: string, titulacion: string, anho: string,
    asignatura: string, grupo: string, profesor: string, espacio: string,
    asistencia: string, hora_inicio: string, hora_fin: string,
    dia: string, fecha: string): Observable<boolean> {

    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("profesor", profesor);
    formData.append("grupo", grupo);
    formData.append("asignatura", asignatura);
    formData.append("anho", anho);
    formData.append("titulacion", titulacion);
    formData.append("espacio", espacio);
    formData.append("hora_inicio", hora_inicio);
    formData.append("hora_fin", hora_fin);
    formData.append("asistencia", asistencia);
    formData.append("dia", dia);
    formData.append("fecha", fecha);

    return this.http.post<HorariosWrapper>(`${environment.api}/?controller=horarios&action=edit`, formData)
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

  public show(id: string): Observable<Horario> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<MostrarHorariosWrapper>(`${environment.api}/?controller=horarios&action=show`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES.horarios[0];
              case '4005':
                throw new Error('4005');
              default:
                throw new Error();
            }
          }
        )
      );
  }

  public deleteHorario(id: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<HorariosWrapper>(`${environment.api}/?controller=horarios&action=delete`, formData)
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
    return this.http.post<InfoAddHorariosWrapper>(`${environment.api}/?controller=horarios&action=info_add`, null)
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

  asistencia(id: string, asistencia: string) {
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("asistencia", asistencia);

    return this.http.post<HorariosWrapper>(`${environment.api}/?controller=horarios&action=asistencia`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return true;
              default:
                throw new Error(resultado.CODE);
            }
          }
        )
      );
  }
}
