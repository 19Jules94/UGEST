import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";


@Injectable()
export class JwtAuthenticationInterceptor implements HttpInterceptor {

  constructor(private readonly authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authenticationService.tieneCredenciales()) {

      const credentials = this.authenticationService.getCredentials();

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${credentials?.token}`
        }
      });

    }
    return next.handle(request);
  }
}
