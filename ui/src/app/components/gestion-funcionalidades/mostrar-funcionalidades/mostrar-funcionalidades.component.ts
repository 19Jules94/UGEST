
import {Component, OnInit} from '@angular/core';
import { GestionFuncionalidadesService } from 'src/app/services/gestion-funcionalidades.service';
import { Funcionalidad } from 'src/app/models/Gestion-funcionalidades/Funcionalidad';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-mostrar-funcionalidades',
  templateUrl: './mostrar-funcionalidades.component.html',
  styleUrls: ['./mostrar-funcionalidades.component.css']
})
export class MostrarFuncionalidadesComponent implements OnInit {

  public funcionalidades?: Array<Funcionalidad>;
  public error?: string;

  constructor(private readonly gestionFuncionalidadesService: GestionFuncionalidadesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }
    
    tieneFuncionalidadAction(func:string, action:string): boolean{
    return this.authenticationService.tieneFuncionalidadAction(func, action);
  }
  ngOnInit(): void {
    this.actualizarFuncionalidades();
  }
  actualizarFuncionalidades() {
    this.gestionFuncionalidadesService.mostrarTodas().subscribe(funcionalidades => this.funcionalidades = funcionalidades.funcionalidades);
  }
  delete(funcionalidad: Funcionalidad) {
    if (funcionalidad) {
      this.gestionFuncionalidadesService.deleteFuncionalidad(funcionalidad.id).subscribe(
        () => {
          this.remove()
          this.actualizarFuncionalidades();
        },

        error => {
          switch (error.message) {
            case '4001':
              this.error = this.ts.instant("gestion-funcionalidades.eliminar-error-foreign")
              break;
            default:
              this.error = this.ts.instant("gestion-funcionalidades.eliminar-error")
              break;
          }
        }
      )
      
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-funcionalidades/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
