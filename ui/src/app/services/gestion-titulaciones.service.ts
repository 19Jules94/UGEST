import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Titulacion } from '../models/Gestion-titulaciones/Titulacion';
import { Titulaciones } from '../models/Gestion-titulaciones/Titulaciones';
import { AddTitulacionesWrapper } from './wrappers/AddTitulacionesWrapper';
import { InfoAddTitulacionesWrapper } from './wrappers/InfoAddTitulacionesWrapper';
import { MostrarTitulacionesWrapper } from './wrappers/MostrarTitulacionesWrapper';
import { TitulacionWrapper } from './wrappers/TitulacionWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionTitulacionesService {

  constructor(private readonly http: HttpClient) { }


  public mostrarTodas(): Observable<Titulaciones> {
    return this.http.post<MostrarTitulacionesWrapper>(`${environment.api}/?controller=titulaciones&action=showall`, null)
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

  public addTitulacion(nombre: string, codigo: string, responsable: string,
    centro: string, anhoacademico: string
  ): Observable<string> {
    var formData: any = new FormData();
    formData.append("codigo", codigo);
    formData.append("nombre", nombre);
    formData.append("responsable", responsable);
    formData.append("centro", centro);
    formData.append("anho", anhoacademico);


    return this.http.post<AddTitulacionesWrapper>(`${environment.api}/?controller=titulaciones&action=add`, formData)
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
              throw new Error(resultado.CODE);
          }

        }
        )
      );
  }

  public editTitulaciones(id: string, nombre: string, codigo: string, responsable: string,
    centro: string, anhoacademico: string
  ): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("codigo", codigo);
    formData.append("nombre", nombre);
    formData.append("responsable", responsable);
    formData.append("centro", centro);
    formData.append("anho", anhoacademico);


    return this.http.post<TitulacionWrapper>(`${environment.api}/?controller=titulaciones&action=edit`, formData)
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
              throw new Error(resultado.CODE);
          }

        }
        )
      );
  }



  public show(id: string): Observable<Titulacion> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<MostrarTitulacionesWrapper>(`${environment.api}/?controller=titulaciones&action=show`, formData)
      .pipe(
        map(resultado => {
          switch (resultado.CODE) {
            case '200':
              return resultado.RESOURCES.titulaciones[0];
            case '4005':
              throw new Error('4005');
            default:
             
              throw new Error();
          }
        }
        )
      );
  }

  public deleteTitulacion(id: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<TitulacionWrapper>(`${environment.api}/?controller=titulaciones&action=delete`, formData)
      .pipe(
        map(resultado => {

          switch (resultado.CODE) {
            case '200':
              return true;
            case '4001':
              throw new Error('4001');
            case '4005':
              throw new Error('4005');
            default:
              throw new Error();
          }
        }
        )
      );
  }

  public info_add(): Observable<any> {
    return this.http.post<InfoAddTitulacionesWrapper>(`${environment.api}/?controller=titulaciones&action=info_add`, null)
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
