import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Acciones} from "../models/Gestion-acciones/Acciones";
import {AccionesWrapper} from "./wrappers/AccionesWrapper";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import { Accion } from '../models/Gestion-acciones/Accion';
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

}
