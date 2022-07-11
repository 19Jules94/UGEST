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
      this.actualizarEdificios();
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-edificios']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
}
