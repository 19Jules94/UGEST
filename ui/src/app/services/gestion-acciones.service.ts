import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Acciones} from "../models/Gestion-acciones/Acciones";
import {AccionesWrapper} from "./wrappers/AccionesWrapper";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import { Accion } from '../models/Gestion-acciones/Accion';
import { AddAccionWrapper } from './wrappers/AddAccionWrapper';
import { DeleteAccionWrapper } from './wrappers/DeleteAccionWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionAccionesService {

  constructor(private readonly http: HttpClient) {
  }
  public mostrarTodas(): Observable<Acciones> {
    return this.http.post<AccionesWrapper>(`${environment.api}/?controller=acciones&action=showall`, null)
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
  public addAccion(nombre:string,descripcion:string){
    var formData:any=new FormData;

    formData.append("nombre",nombre);
    formData.append("descripcion",descripcion);
    return this.http.post<AddAccionWrapper>(`${environment.api}/?controller=acciones&action=add`, formData)
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
  public deleteAccion(id:String){
    var formData: any = new FormData();
    formData.append("id", id);
    return this.http.post<DeleteAccionWrapper>(`${environment.api}/?controller=acciones&action=delete`, formData)
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
