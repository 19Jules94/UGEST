import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PDAWrapper } from './wrappers/PDAWrapper';

@Injectable({
  providedIn: 'root'
})
export class GestionPDAServiceService {

  constructor(private readonly http: HttpClient) {
  }

  public upload(file: File): Observable<boolean> {

    var formData: any = new FormData();
    formData.append('file', file);

    return this.http.post<PDAWrapper>(`${environment.api}/?controller=pda`, formData)
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
