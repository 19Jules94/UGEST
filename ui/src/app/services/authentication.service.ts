import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';
import {Credenciales} from "../models/Credenciales";
import {map} from "rxjs/operators";
import {CredencialesWrapper} from "./wrappers/CredencialesWrapper";
import {Perfil} from "../models/Perfil";

const CREDENCIALES = 'credenciales';
const ACCIONES_FUNCIONALIDADES = 'acciones_funcionalidades';
const PERFIL='Perfil';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private readonly http:HttpClient) { }
  public tieneCredenciales():boolean{
    return localStorage.getItem(CREDENCIALES)!==null;
  }

  public obtenerCredenciales():Credenciales|undefined{

    const item = localStorage.getItem(CREDENCIALES);
    const acc = localStorage.getItem(ACCIONES_FUNCIONALIDADES);
    const perfil = localStorage.getItem(PERFIL);

    if(item && acc && perfil){
      return new Credenciales(item,JSON.parse(acc),JSON.parse(perfil));
    }else{
      return undefined;
    }
  }

  public login(dni:string,pass:string):Observable<Credenciales>{
    var formData:any = new FormData();
    formData.append("dni",dni);
    formData.append("password",pass);
console.log("primer log");

    return this.http.post<CredencialesWrapper>(`${environment.api}/?controller=login`,formData)
    .pipe(      
      map(credenciales =>{
        console.log("seg log");
        let recursos;
        if(credenciales.CODE=='200'){
          localStorage.setItem(CREDENCIALES,credenciales.RESOURCES.token);
          localStorage.setItem(ACCIONES_FUNCIONALIDADES,JSON.stringify(credenciales.RESOURCES.acciones_funcionalidades));
          localStorage.setItem(PERFIL,JSON.stringify(credenciales.RESOURCES.perfil));
          recursos=credenciales.RESOURCES
          console.log("entra");
        }else{
          console.log("entra a error");
          throw new Error();
        
          
        }
        return recursos
      })
    );

  }
  public logout() {
    localStorage.removeItem(CREDENCIALES);
    localStorage.removeItem(ACCIONES_FUNCIONALIDADES);
    localStorage.removeItem(PERFIL);
  }

  getProfile(): Perfil | undefined {
    const perfil = localStorage.getItem(PERFIL);
    if (perfil) {
      return JSON.parse(perfil);
    }else {
      return undefined;
    }
  }
}
