import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Edificios } from '../models/Gestion-edificios/Edificios';
import { Espacio } from '../models/Gestion-espacios/Espacio';
import { Espacios } from '../models/Gestion-espacios/Espacios';
import { EspaciosWrapper } from './wrappers/EspaciosWrapper';
import { AddEspaciosWrapper } from './wrappers/gestion-espacios/AddEspaciosWrapper';
import { InfoAddEspaciosWrapper } from './wrappers/gestion-espacios/InfoAddEspacioWrapper';
import { MostrarEspaciosWrapper } from './wrappers/gestion-espacios/MostrarEspaciosWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionEspaciosService {

  constructor(private readonly http: HttpClient) {
  }

  public mostrarTodas(): Observable<Espacios> {
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

  public addAEspacio(nombre: string, tipo: string, edificio: string): Observable<string> {

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
            case '4004':
              throw new Error('4004');
            default:
              throw new Error(resultado.CODE);
          }

        }
        )
      );
  }

  public editEspacio(id: string, nombre: string, tipo: string, edificio: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("tipo", tipo);
    formData.append("edificio", edificio);


    return this.http.post<EspaciosWrapper>(`${environment.api}/?controller=espacios&action=edit`, formData)
      .pipe(
        map(resultado => {
          switch (resultado.CODE) {
            case '200':
              return true;
            case '4005':
              throw new Error('4005');
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


  public show(id: string): Observable<Espacio> {
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

  public deleteEspacio(id: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<EspaciosWrapper>(`${environment.api}/?controller=espacios&action=delete`, formData)
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
}
