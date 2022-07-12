import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Titulacion } from 'src/app/models/Gestion-titulaciones/Titulacion';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GestionTitulacionesService } from 'src/app/services/gestion-titulaciones.service';

@Component({
  selector: 'app-mostrar-titulaciones',
  templateUrl: './mostrar-titulaciones.component.html',
  styleUrls: ['./mostrar-titulaciones.component.css']
})
export class MostrarTitulacionesComponent implements OnInit {

  public titulaciones?: Array<Titulacion>;
  constructor(private readonly gestionTitulaciones: GestionTitulacionesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }


  tieneFuncionalidadAction(func:string, action:string): boolean{
      return this.authenticationService.tieneFuncionalidadAction(func, action);
    }
  ngOnInit(): void {
    this.actualizarTitulaciones();
  }
  private actualizarTitulaciones() {
    this.gestionTitulaciones.mostrarTodas().subscribe(titulaciones => this.titulaciones = titulaciones.titulaciones);
  }
  deleteTitulacion(titulacion: Titulacion) {
    if (titulacion) {
      this.gestionTitulaciones.deleteTitulacion(titulacion.id).subscribe(
        () => {
          this.remove()

        },

        error => {
          switch (error.message) {
            case '1451':
             console.log("error")
              break;
            default:
              console.log("error")
              break;
          }
        }
      )
      this.actualizarTitulaciones();
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-titulaciones/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }

}
