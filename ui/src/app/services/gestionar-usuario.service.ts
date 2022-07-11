import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario} from '../models/Gestion-usuario/Usuario';
import { UsuariosWrapper } from "./wrappers/UsuariosWrapper";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { EditUsuariosWrapper } from './wrappers/EditUsuarioWrapper';
import { Usuarios } from '../models/Gestion-usuario/Usuarios';
import { AddUsuariosWrapper } from './wrappers/AddUsuarioWrapper';
import { DeleteUsuariosWrapper } from './wrappers/DeleteUsuarioWrapper';


@Injectable({
  providedIn: 'root'
})
export class GestionarUsuarioService {

  constructor(private readonly http: HttpClient) { }

public mostrarTodos(): Observable<Usuarios>{
  return this.http.post<UsuariosWrapper>(`${environment.api}/?controller=usuarios&action=showall`, null)
  .pipe(   
     map(resultado => {

    switch (resultado.CODE) {
      case '200':
        return resultado.RESOURCES;
      default:
        throw new Error();
    }

  })
  );
}
public addUsuario(dni: string, nombre: string, apellidos: string, email: string, password: string){
  var formData: any = new FormData();
  formData.append("dni", dni);
  formData.append("nombre", nombre);
  formData.append("apellidos", apellidos);
  formData.append("email", email);
  formData.append("password", password);

  return this.http.post<AddUsuariosWrapper>(`${environment.api}/?controller=usuarios&action=add`, formData)
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
public deleteUsuario(dni: String): Observable<boolean>{
  var formData: any = new FormData();
  formData.append("dni", dni);


  return this.http.post<DeleteUsuariosWrapper>(`${environment.api}/?controller=usuarios&action=delete`, formData)
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
public editUsuario(dni: string, nombre: string, apellidos: string, email: string,password: string){
  var formData: any = new FormData();
  formData.append("dni", dni);
  formData.append("nombre", nombre);
  formData.append("apellidos", apellidos);
  formData.append("email", email);
  formData.append("password", password);
  return this.http.post<EditUsuariosWrapper>(`${environment.api}/?controller=usuarios&action=edit`, formData)
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
public show(dni: String): Observable<Usuario> {
  var formData: any = new FormData();
  formData.append("dni", dni);

  return this.http.post<UsuariosWrapper>(`${environment.api}/?controller=usuarios&action=show`, formData)
    .pipe(
      map(resultado => {
        switch (resultado.CODE) {
          case '200':
            return resultado.RESOURCES.usuarios[0];
          case '4001':
            throw new Error('4001');
          default:
            throw new Error();
        }
      }
      )
    );
}
  public editPasswordEmail(email:string,password:string){
    var formData: any = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    return this.http.post<EditUsuariosWrapper>(`${environment.api}/?controller=usuarios&action=edit-password`, formData)
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
