import { Component, OnInit } from '@angular/core';
import { AAcademico } from 'src/app/models/Gestion-AAcademico/AAcademico';
import { GestionEspacioService } from 'src/app/services/gestion-espacio.service';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../services/authentication.service";
import { GestionAacademicoService } from 'src/app/services/gestion-aacademico.service';
import { Espacio } from 'src/app/models/Gestion-espacios/Espacio';

@Component({
  selector: 'app-mostrar-aacademico',
  templateUrl: './mostrar-aacademico.component.html',
  styleUrls: ['./mostrar-aacademico.component.css']
})
export class MostrarAAcademicoComponent implements OnInit {

  public anhos?: Array<AAcademico>;
  public error?: string;
  constructor(private readonly gestionAAcademicoService: GestionAacademicoService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              public ts: TranslateService,
              private readonly authenticationService: AuthenticationService,
              ) {

   
  }
  tieneFuncionalidadAction(func:string, action:string): boolean{
    return this.authenticationService.tieneFuncionalidadAction(func, action);
  }

  ngOnInit(): void {
    this.actualizarAnhos();
  }
  private actualizarAnhos() {
    this.gestionAAcademicoService.mostrartodos().subscribe(value => this.anhos = value.anhos);
  }
  deleteAAcademico(aacademico: AAcademico) {
    if (aacademico) {
      this.gestionAAcademicoService.deleteAAcademico(aacademico.id).subscribe(
        () => {
          this.remove()
          this.actualizarAnhos();
        },

        error => {
          switch (error.message) {
            case '4001':
              this.error = this.ts.instant("gestion-aacademico.eliminar-error");
              break;
            default:
              this.error = this.ts.instant("gestion-aacademico.eliminar-error-foreign-key");
              break;
          }
        }
      )
      
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-aacademico/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }


  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
