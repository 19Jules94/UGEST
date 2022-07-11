import {Component, OnInit} from '@angular/core';
import { Profesor } from 'src/app/models/Gestion-Profesores/Profesor';
import { GestionEdificiosService } from 'src/app/services/gestion-edificios.service';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GestionProfesoresService} from "../../../services/gestion-profesores.service";
import { Edificio } from 'src/app/models/Gestion-edificios/Edificio';
import { Edificios } from 'src/app/models/Gestion-edificios/Edificios';
import { Profesores } from 'src/app/models/Gestion-Profesores/Profesores';

@Component({
  selector: 'app-mostrar-profesores',
  templateUrl: './mostrar-profesores.component.html',
  styleUrls: ['./mostrar-profesores.component.css']
})
export class MostrarProfesoresComponent implements OnInit {
  public profesores?: Array<Profesor>;
  constructor(private readonly gestionProfesoresService: GestionProfesoresService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }


  tieneFuncionalidadAction(func:string, action:string): boolean{
      return this.authenticationService.tieneFuncionalidadAction(func, action);
    }
  ngOnInit(): void {
    this.actualizarProfesores();
  }
  private actualizarProfesores() {
    this.gestionProfesoresService.mostrarTodos().subscribe(profesores => this.profesores = profesores.profesores);
  }
  deleteProfesor(profesor: Profesor) {
    if (profesor) {
      this.gestionProfesoresService.deleteProfesor(profesor.dni).subscribe(
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
      this.actualizarProfesores();
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-profesores/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
}
