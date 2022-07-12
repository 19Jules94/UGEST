import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Centros } from '../models/Gestion-centros/Centros';
import { Departamento } from '../models/Gestion-departamentos/Departamento';
import { Departamentos } from '../models/Gestion-departamentos/Departamentos';
import { CentrosWrapper } from './wrappers/gestion-centros/CentrosWrapper';
import { AddEDepartamentosWrapper } from './wrappers/gestion-departamentos/AddDepartamentosWrapper';
import { DeleteDepartamentosWrapper } from './wrappers/gestion-departamentos/DeleteDepartamentosWrapper';
import { EditDepartamentosWrapper } from './wrappers/gestion-departamentos/EditDepartamentosWrapper';
import { MostrarDepartamentosWrapper } from './wrappers/gestion-departamentos/MostrarDepartamentosWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionDepartamentosService {

  constructor(private readonly http: HttpClient) { }

  public mostrarTodos(): Observable<Departamentos> {
    return this.http.post<MostrarDepartamentosWrapper>(`${environment.api}/?controller=departamentos&action=showall`, null)
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
  public deleteDepartamento(id: String): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<DeleteDepartamentosWrapper>(`${environment.api}/?controller=departamentos&action=delete`, formData)
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
  public info_add(): Observable<Centros> {
    return this.http.post<CentrosWrapper>(`${environment.api}/?controller=departamentos&action=info_add`, null)
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

  public addDepartamento(nombre: string, codigo: string, centro: string): Observable<string> {
    var formData: any = new FormData();
    formData.append("nombre", nombre);
    formData.append("codigo", codigo);
    formData.append("centro", centro);

    return this.http.post<AddEDepartamentosWrapper>(`${environment.api}/?controller=departamentos&action=add`, formData)
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

  public show(id: string): Observable<Departamento> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<MostrarDepartamentosWrapper>(`${environment.api}/?controller=departamentos&action=show`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return resultado.RESOURCES.departamentos[0];
              case '4005':
                throw new Error('4005');
              default:
                throw new Error();
            }
          }
        )
      );
  }

  public editDepartamento(id: string, nombre: string, codigo: string, centro: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("codigo", codigo);
    formData.append("centro", centro);

    return this.http.post<EditDepartamentosWrapper>(`${environment.api}/?controller=departamentos&action=edit`, formData)
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
