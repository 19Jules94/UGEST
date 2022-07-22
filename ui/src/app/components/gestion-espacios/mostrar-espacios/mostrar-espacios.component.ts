import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Espacio } from 'src/app/models/Gestion-espacios/Espacio';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GestionEspacioService } from 'src/app/services/gestion-espacio.service';

@Component({
  selector: 'app-mostrar-espacios',
  templateUrl: './mostrar-espacios.component.html',
  styleUrls: ['./mostrar-espacios.component.css']
})
export class MostrarEspaciosComponent implements OnInit {

  public espacios?: Array<Espacio>;
  public error?:string;
  constructor(private readonly gestionEspacios: GestionEspacioService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }


  tieneFuncionalidadAction(func:string, action:string): boolean{
      return this.authenticationService.tieneFuncionalidadAction(func, action);
    }
  ngOnInit(): void {
    this.actualizarEspacios();
  }
  private actualizarEspacios() {
    this.gestionEspacios.mostrarTodos().subscribe(espacios => this.espacios = espacios.espacios);
  }
  deleteEspacio(espacio: Espacio) {
    if (espacio) {
      this.gestionEspacios.deleteEspacio(espacio.id).subscribe(
        () => {
          this.remove()
this.actualizarEspacios();
        },

        error => {
          switch (error.message) {
            case '4001':
              this.error = this.ts.instant("gestion-espacios.eliminar-error-foreign-key");
              break;
            default:
              this.error = this.ts.instant("gestion-espacios.eliminar-error");
              break;
          }
        }
      )
      
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-espacios/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
  
}
