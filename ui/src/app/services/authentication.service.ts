import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';
import {Credentials} from "../models/Credentials";
import {map} from "rxjs/operators";
import {CredentialsWrapper} from "./wrappers/CredentialsWrapper";
import {Profile} from "../models/Profile";

const CREDENTIALS_ITEM = 'credentials';
const ACCIONES_FUNCIONALIDADES_ITEM = 'acciones_funcionalidades';
const PROFILE = 'profile';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly http: HttpClient) { }

  public hasCredentials(): boolean {
    return localStorage.getItem(CREDENTIALS_ITEM) !== null;
  }

  public getCredentials(): Credentials | undefined {

    const item = localStorage.getItem(CREDENTIALS_ITEM);
    const acc_func = localStorage.getItem(ACCIONES_FUNCIONALIDADES_ITEM);
    const profile = localStorage.getItem(PROFILE);
    console.log("perfil"+profile);

    if (item && acc_func && profile) {
      return new Credentials(item, JSON.parse(acc_func), JSON.parse(profile));
    } else {
      return undefined;
    }

  }

  public hasFuncionalidad(func: string) : boolean {
    const acc_func = localStorage.getItem(ACCIONES_FUNCIONALIDADES_ITEM);
    if (acc_func) {
      const acc_func_parsed = JSON.parse(acc_func);
      return !!acc_func_parsed[func];
    } else {
      return false;
    }
  }

  public hasFuncionalidadAction(func: string, action: string) : boolean {
    const acc_func = localStorage.getItem(ACCIONES_FUNCIONALIDADES_ITEM);
    if (acc_func) {
      const acc_func_parsed = JSON.parse(acc_func);
      if(!!acc_func_parsed[func]){
        return acc_func_parsed[func].some((e: string) => e === action)
      }else{
        return false;
      }

    } else {
      return false;
    }
  }

  public login(dni: string, password: string): Observable<Credentials> {

    var formData: any = new FormData();
    formData.append("dni", dni);
    formData.append("password", password);

    return this.http.post<CredentialsWrapper>(`${environment.api}/?controller=login`, formData)
      .pipe(
        map(credentials => {
          let resourc;
         
          if (credentials.CODE == '200') {
            localStorage.setItem(CREDENTIALS_ITEM, credentials.RESOURCES.token);
            localStorage.setItem(ACCIONES_FUNCIONALIDADES_ITEM, JSON.stringify(credentials.RESOURCES.acciones_funcionalidades));
            localStorage.setItem(PROFILE, JSON.stringify(credentials.RESOURCES.profile)); 
                    
            resourc = credentials.RESOURCES;
            console.log(resourc);
          } else {
            throw new Error();
          }
          return resourc;
        }
        )

      );
  }

  public logout() {
    localStorage.removeItem(CREDENTIALS_ITEM);
    localStorage.removeItem(ACCIONES_FUNCIONALIDADES_ITEM);
    localStorage.removeItem(PROFILE);
  }

  getProfile(): Profile | undefined {
    const profile = localStorage.getItem(PROFILE);
    if (profile) {
      return JSON.parse(profile);
    }else {
      return undefined;
    }
  }
}
