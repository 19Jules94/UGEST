import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Funcionalidades } from '../models/Gestion-funcionalidades/Funcionalidades';
import { FuncionalidadesWrapper } from './wrappers/FuncionalidadesWrapper';
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import { Funcionalidad } from '../models/Gestion-funcionalidades/Funcionalidad';
import { AddFuncionalidadWrapper } from './wrappers/AddFuncionalidadWrapper';
import { DeleteFuncionalidadWrapper } from './wrappers/DeleteFuncionalidadWrapper';
@Injectable({
  providedIn: 'root'
})
export class GestionFuncionalidadesService {

  constructor(private readonly http: HttpClient) {
  }
  public mostrarTodas(): Observable<Funcionalidades> {
    return this.http.post<FuncionalidadesWrapper>(`${environment.api}/?controller=funcionalidades&action=showall`, null)
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
  public addFuncionalidad(nombre:string,descripcion:string){
    var formData:any=new FormData;

    formData.append("nombre",nombre);
    formData.append("descripcion",descripcion);
    return this.http.post<AddFuncionalidadWrapper>(`${environment.api}/?controller=funcionalidades&action=add`, formData)
    .pipe(
      map(resultado => {
        switch (resultado.CODE) {
          case '200':
            return resultado.RESOURCES.resultado;
          default:
            throw new Error();
        }

      }
      )
    );
    
  }
  public deleteFuncionalidad(id:String){
    var formData: any = new FormData();
    formData.append("id", id);
    return this.http.post<DeleteFuncionalidadWrapper>(`${environment.api}/?controller=funcionalidades&action=delete`, formData)
    .pipe(
      map(resultado => {
        switch (resultado.CODE) {
          case '200':
            return resultado.RESOURCES.resultado;
          default:
            throw new Error();
        }

      }
      )
    );
  }
}
