import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Permiso } from 'src/app/models/Gestion-permisos/Permiso';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GestionPermisosService } from 'src/app/services/gestion-permisos.service';


@Component({
  selector: 'app-mostrar-permisos',
  templateUrl: './mostrar-permisos.component.html',
  styleUrls: ['./mostrar-permisos.component.css'],
})
export class MostrarPermisosComponent implements OnInit {
  public permisos?: Array<Permiso>;
  public error?:string;
  constructor(
    private readonly gestionPermisosService: GestionPermisosService,
    public ts: TranslateService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authenticationService: AuthenticationService,

  ) {}

  ngOnInit(): void {
    this.actualizarPermisos();
  }

  actualizarPermisos() {
    this.gestionPermisosService.mostrarTodos().subscribe(
      permisos => {
        this.permisos = permisos.Permisos;
       });
  }

  tieneFuncionalidadAction(func: string, action: string): boolean {
    return this.authenticationService.tieneFuncionalidadAction(func, action);
  }
  delete(permiso: Permiso) {
    if (permiso) {
      this.gestionPermisosService.deletePermiso(permiso.rol_id,permiso.func_id,permiso.accion_id).subscribe(
        () => {
          this.remove()
this.actualizarPermisos();
        },

        error => {
          this.error =this.ts.instant("gestion-permisos.eliminar-error");
        
        }
      )
      this.actualizarPermisos();
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-permisos/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }

  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}


