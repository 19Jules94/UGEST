import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario} from '../models/Gestion-usuario/Usuario';
import { UsuariosWrapper } from "./wrappers/UsuariosWrapper";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { EditUsuariosWrapper } from './wrappers/EditUsuarioWrapper';



@Injectable({
  providedIn: 'root'
})
export class GestionarUsuarioService {

  constructor(private readonly http: HttpClient) { }



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
