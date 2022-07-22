import {Component, OnInit} from '@angular/core';
import {GestionRolesService} from "../../../services/gestion-roles.service";
import { Rol } from 'src/app/models/Gestion-roles/Rol';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";


@Component({
  selector: 'app-mostrar-roles',
  templateUrl: './mostrar-roles.component.html',
  styleUrls: ['./mostrar-roles.component.css']
})
export class MostrarRolesComponent implements OnInit {

  public roles?: Array<Rol>;
  public error?:string;

  constructor(private readonly gestionRolesService: GestionRolesService,
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
    this.actualizarRoles();
  }
  actualizarRoles() {
    this.gestionRolesService.mostrarTodos().subscribe(roles => this.roles = roles.roles);
  }
  delete(rol: Rol) {
    if (rol) {
      this.gestionRolesService.deleteRol(rol.id).subscribe(
        () => {
          this.remove()
this.actualizarRoles();
        },

        error => {
          switch (error.message) {
            case '4001':
              this.error =(this.ts.instant("gestion-roles.eliminar-error-foreign"))
              break;
            default:
              this.error =(this.ts.instant("gestion-roles.eliminar-error"))
              break;
          }
        }
      )
     
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-roles/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
