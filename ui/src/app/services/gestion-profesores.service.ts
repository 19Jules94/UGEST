import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import { Profesores } from '../models/Gestion-Profesores/Profesores';
import { MostrarProfesoresWrapper } from './wrappers/gestion-profesores/MostrarProfesoresWrapper';
import { InfoAddProfesoresWrapper } from './wrappers/gestion-profesores/InfoAddProfesorWrapper';
import { Usuarios_Departamentos } from '../models/Gestion-Profesores/Usuarios_Departamento';
import { AddProfesoresWrapper } from './wrappers/gestion-profesores/AddProfesorWrapper';
import { Profesor } from '../models/Gestion-Profesores/Profesor';
import { DeleteProfesorWrapper } from './wrappers/gestion-profesores/DeleteProfesorWrapper';
import { EditProfesoresWrapper } from './wrappers/gestion-profesores/EditProfesoresWrapper';
@Injectable({
  providedIn: 'root'
})
export class GestionProfesoresService {

  constructor(private readonly http: HttpClient) { }
  public mostrarTodos(): Observable<Profesores> {
    return this.http.post<MostrarProfesoresWrapper>(`${environment.api}/?controller=$profesores&action=showall`, null)
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

  public deleteProfesor(id: String): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<DeleteProfesorWrapper>(`${environment.api}/?controller=profesores&action=delete`, formData)
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

  public info_add(): Observable<Usuarios_Departamentos> {
    return this.http.post<InfoAddProfesoresWrapper>(`${environment.api}/?controller=profesores&action=info_add`, null)
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

  public addProfesor(dni: string, departamento: string, dedicacion: string): Observable<string> {
    var formData: any = new FormData();
    formData.append("dni", dni);
    formData.append("departamento", departamento);
    formData.append("dedicacion", dedicacion);

    return this.http.post<AddProfesoresWrapper>(`${environment.api}/?controller=profesores&action=add`, formData)
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

  public show(dni: String): Observable<Profesor> {
    var formData: any = new FormData();
    formData.append("dni", dni);

    return this.http.post<MostrarProfesoresWrapper>(`${environment.api}/?controller=profesores&action=show`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES.profesores[0];
              case '4005':
                throw new Error('4005');
              default:
                throw new Error();
            }
          }
        )
      );
  }

  public editProfesores(dni: string, departamento: string, dedicacion: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("dni", dni);
    formData.append("departamento", departamento);
    formData.append("dedicacion", dedicacion);

    return this.http.post<EditProfesoresWrapper>(`${environment.api}/?controller=profesores&action=edit`, formData)
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
