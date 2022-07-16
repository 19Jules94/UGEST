import {Component, OnInit} from '@angular/core';
import {GestionAccionesService} from "../../../services/gestion-acciones.service";
import { Accion } from 'src/app/models/Gestion-acciones/Accion';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-mostrar-acciones',
  templateUrl: './mostrar-acciones.component.html',
  styleUrls: ['./mostrar-acciones.component.css']
})
export class MostrarAccionesComponent implements OnInit {
  public acciones?: Array<Accion>;
  

  constructor(private readonly gestionAccionesService: GestionAccionesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }
    
    tieneFuncionalidadAction(func:string, action:string): boolean{
    return this.authenticationService.tieneFuncionalidadAction(func, action);
  }
  ngOnInit(): void {
    this.actualizarAcciones();
  }
  actualizarAcciones() {
    this.gestionAccionesService.mostrarTodas().subscribe(acciones => this.acciones = acciones.acciones);
  }
  delete(accion: Accion) {
    if (accion) {
      this.gestionAccionesService.deleteAccion(accion.id).subscribe(
        () => {
          this.remove()

        },

        error => {
          switch (error.message) {
            case '4001':
              this.removeError(this.ts.instant("gestion-acciones.eliminar-error-foreign"))
              break;
            default:
              this.removeError(this.ts.instant("gestion-acciones.eliminar-error"))
              break;
          }
        }
      )
      this.actualizarAcciones();
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-acciones/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
  private removeError(msg: string) {
    this.router.navigate(['/panel-principal/gestion-acciones/showall'], {queryParams: {flasherror: msg}});
    window.scrollTo({top: 0, behavior: 'smooth'});
    
  }
}
