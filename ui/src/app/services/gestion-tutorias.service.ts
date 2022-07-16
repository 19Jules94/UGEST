import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tutoria } from '../models/Gestion-tutorias/Tutoria';
import { Tutorias } from '../models/Gestion-tutorias/Tutorias';
import { AddTutoriasWrapper } from './wrappers/AddTutoriasWrapper';
import { InfoAddTutoriasWrapper } from './wrappers/InfoAddTutoriasWrapper';
import { MostrarTutoriasWrapper } from './wrappers/MostrarTutoriasWrapper';
import { TutoriasWrapper } from './wrappers/TutoriasWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionTutoriasService {

  constructor(private readonly http: HttpClient) { }

  public mostrartodas(): Observable<Tutorias> {
    return this.http.post<MostrarTutoriasWrapper>(`${environment.api}/?controller=tutorias&action=showall`, null)
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
  public calendar(): Observable<Tutorias> {
    return this.http.post<MostrarTutoriasWrapper>(`${environment.api}/?controller=tutorias&action=calendar`, null)
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

  public addTutoria(anho: string, profesor: string, espacio: string, asistencia: string, fecha: string, hora_inicio: string, hora_fin: string): Observable<string> {
    var formData: any = new FormData();
    formData.append("anho", anho);
    formData.append("profesor", profesor);
    formData.append("espacio", espacio);
    formData.append("asistencia", asistencia);
    formData.append("fecha", fecha);
    formData.append("hora_inicio", hora_inicio);
    formData.append("hora_fin", hora_fin);

    return this.http.post<AddTutoriasWrapper>(`${environment.api}/?controller=tutorias&action=add`, formData)
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


  public editTutoria(id: string, anho: string, profesor: string, espacio: string, asistencia: string, fecha: string, hora_inicio: string, hora_fin: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("anho", anho);
    formData.append("profesor", profesor);
    formData.append("espacio", espacio);
    formData.append("asistencia", asistencia);
    formData.append("fecha", fecha);
    formData.append("hora_inicio", hora_inicio);
    formData.append("hora_fin", hora_fin);

    return this.http.post<TutoriasWrapper>(`${environment.api}/?controller=tutorias&action=edit`, formData)
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

  public show(id: string): Observable<Tutoria> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<MostrarTutoriasWrapper>(`${environment.api}/?controller=tutorias&action=show`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES.tutorias[0];
              case '4005':
                throw new Error('4005');
              default:
                throw new Error();
            }
          }
        )
      );
  }

  public deleteTutoria(id: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<TutoriasWrapper>(`${environment.api}/?controller=tutorias&action=delete`, formData)
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
    return this.http.post<InfoAddTutoriasWrapper>(`${environment.api}/?controller=tutorias&action=info_add`, null)
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

    return this.http.post<TutoriasWrapper>(`${environment.api}/?controller=tutorias&action=asistencia`, formData)
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
