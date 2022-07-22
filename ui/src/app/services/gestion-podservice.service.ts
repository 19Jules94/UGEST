import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import { PODWrapper } from './wrappers/PODWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionPODServiceService {

  constructor(private readonly http: HttpClient) {
  }

  public upload(file: File): Observable<boolean> {

    var formData: any = new FormData();
    formData.append('file', file);

    return this.http.post<PODWrapper>(`${environment.api}/?controller=pod&action=add`, formData)
      .pipe(
        map(resultado => {
            switch (resultado.CODE) {
              case '200':
                return true;
              default:
                throw new Error();
            }

          }
        )
      );
  }
}
