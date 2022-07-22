import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import {AuthenticationService} from "../../../services/authentication.service";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {GestionEdificiosService} from "../../../services/gestion-edificios.service";
import { Edificio } from 'src/app/models/Gestion-edificios/Edificio';

@Component({
  selector: 'app-mostrar-edificios',
  templateUrl: './mostrar-edificios.component.html',
  styleUrls: ['./mostrar-edificios.component.css']
})
export class MostrarEdificiosComponent implements OnInit {
  public edificios?: Array<Edificio>;
  public error?:string;
  constructor(private readonly gestionEdificiosService: GestionEdificiosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.actualizarEdificios();
  }
  tieneFuncionalidadAction(func:string, action:string): boolean{
    return this.authenticationService.tieneFuncionalidadAction(func, action);
  }

  private actualizarEdificios() {
    this.gestionEdificiosService.mostrarTodos().subscribe(edificios => this.edificios = edificios.edificios)
  }

  deleteEdificio(edificio: Edificio) {
    if (edificio) {
      this.gestionEdificiosService.deleteEdificio(edificio.id).subscribe(
        () => {
          this.remove()
this.actualizarEdificios();
        },

        error => {
          this.error = this.ts.instant("gestion-edificios.eliminar-error");
        }
      )
      
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-edificios']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }

  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
