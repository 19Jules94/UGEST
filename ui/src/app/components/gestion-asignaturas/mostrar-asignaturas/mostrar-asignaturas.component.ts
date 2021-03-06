import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Asignatura } from 'src/app/models/Gestion-asignaturas/Asignatura';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GestionAsignaturasService } from 'src/app/services/gestion-asignaturas.service';

@Component({
  selector: 'app-mostrar-asignaturas',
  templateUrl: './mostrar-asignaturas.component.html',
  styleUrls: ['./mostrar-asignaturas.component.css']
})
export class MostrarAsignaturasComponent implements OnInit {

  public asignaturas?: Array<Asignatura>;
  public error? :string;
  constructor(private readonly gestionAsignaturas: GestionAsignaturasService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }


  tieneFuncionalidadAction(func:string, action:string): boolean{
      return this.authenticationService.tieneFuncionalidadAction(func, action);
    }
  ngOnInit(): void {
    this.actualizarAsignaturas();
  }
  private actualizarAsignaturas() {
    this.gestionAsignaturas.mostrarTodas().subscribe(asignaturas => this.asignaturas = asignaturas.asignaturas);
  }
  deleteAsignatura(asignatura: Asignatura) {
    if (asignatura) {
      this.gestionAsignaturas.deleteAsignatura(asignatura.id).subscribe(
        () => {
          this.remove()
           this.actualizarAsignaturas();
        },

        error => {
          switch (error.message) {
            case '4001':
              this.error=this.ts.instant("gestion-asignaturas.eliminar-error-foreign-key");
              break;
            default:
              this.error = this.ts.instant("gestion-asignaturas.eliminar-error-foreign-key");
              break;
          }
        }
      )
      
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-asignaturas/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
 

  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
