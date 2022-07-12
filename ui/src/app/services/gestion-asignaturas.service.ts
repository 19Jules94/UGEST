import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Asignatura } from '../models/Gestion-asignaturas/Asignatura'; 
import { Asignaturas } from '../models/Gestion-asignaturas/Asignaturas'; 
import { AddEDepartamentosWrapper } from './wrappers/gestion-departamentos/AddDepartamentosWrapper';
import { AsignaturaWrapper } from './wrappers/AsignaturaWrapper'; 
import { InfoAddAsignaturasWrapper } from './wrappers/InfoAddAsignaturasWrapper'; 
import { MostrarAsignaturasWrapper } from './wrappers/MostrarAsignaturasWrapper'; 
import { AddAsignaturaWrapper } from './wrappers/AddAsignaturaWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionAsignaturasService {

  constructor(private readonly http: HttpClient) {
  }

  public mostrarTodas(): Observable<Asignaturas> {
    return this.http.post<MostrarAsignaturasWrapper>(`${environment.api}/?controller=asignaturas&action=showall`, null)
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

  public addAsignatura(nombre: string, creditos: string, contenido: string,
    tipo: string, horas: string, cuatrimestre: string,
    titulacion: string, anhoacademico: string, departamento: string,
    codigo: string, profesor: string
  ): Observable<string> {

    var formData: any = new FormData();
    formData.append("nombre", nombre);
    formData.append("creditos", creditos);
    formData.append("contenido", contenido);
    formData.append("tipo", tipo);
    formData.append("horas", horas);
    formData.append("cuatrimestre", cuatrimestre);
    formData.append("titulacion", titulacion);
    formData.append("anhoacademico", anhoacademico);
    formData.append("departamento", departamento);
    formData.append("profesor", profesor);
    formData.append("codigo", codigo);


    return this.http.post<AddAsignaturaWrapper>(`${environment.api}/?controller=asignaturas&action=add`, formData)
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

  public editAsignatura(id: string, nombre: string, creditos: string, contenido: string,
    tipo: string, horas: string, cuatrimestre: string,
    titulacion: string, anhoacademico: string, departamento: string,
    profesor: string, codigo: string
  ): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("creditos", creditos);
    formData.append("contenido", contenido);
    formData.append("tipo", tipo);
    formData.append("horas", horas);
    formData.append("cuatrimestre", cuatrimestre);
    formData.append("titulacion", titulacion);
    formData.append("anhoacademico", anhoacademico);
    formData.append("departamento", departamento);
    formData.append("profesor", profesor);
    formData.append("codigo", codigo);


    return this.http.post<AsignaturaWrapper>(`${environment.api}/?controller=asignaturas&action=edit`, formData)
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


  public show(id: string): Observable<Asignatura> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<MostrarAsignaturasWrapper>(`${environment.api}/?controller=asignaturas&action=show`, formData)
      .pipe(
        map(resultado => {
          switch (resultado.CODE) {
            case '200':
              return resultado.RESOURCES.asignaturas[0];
            case '4005':
              throw new Error('4005');
            default:
              throw new Error();
          }
        }
        )
      );
  }

  public deleteAsignatura(id: string): Observable<boolean> {
    var formData: any = new FormData();
    formData.append("id", id);

    return this.http.post<AsignaturaWrapper>(`${environment.api}/?controller=asignaturas&action=delete`, formData)
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
    return this.http.post<InfoAddAsignaturasWrapper>(`${environment.api}/?controller=asignaturas&action=info_add`, null)
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
