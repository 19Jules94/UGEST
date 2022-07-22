import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Rol_Usuario } from 'src/app/models/Gestion-roles-usuario/Rol_Usuario';
import { Usuario } from 'src/app/models/Gestion-usuario/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GestionRolesUsuarioService } from 'src/app/services/gestion-roles-usuario.service';

@Component({
  selector: 'app-mostrar-roles-usuarios',
  templateUrl: './mostrar-roles-usuarios.component.html',
  styleUrls: ['./mostrar-roles-usuarios.component.css']
})
export class MostrarRolesUsuariosComponent implements OnInit {

  public roles_usuario?: Array<Rol_Usuario>;
  public error?:string;
  
  constructor(private readonly GestionRolesUsuario: GestionRolesUsuarioService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.actualizarRolesUsuario();
  }
  tieneFuncionalidadAction(func:string, action:string): boolean{
    return this.authenticationService.tieneFuncionalidadAction(func, action);
  }

  private actualizarRolesUsuario() {
    this.GestionRolesUsuario.mostrarTodos().subscribe(roles_usuario => this.roles_usuario = roles_usuario.roles_usuarios);
  }

  deleteRolUsuario(rol_usuario: Rol_Usuario) {
    if (rol_usuario) {
      this.GestionRolesUsuario.deleteRolUsuario(rol_usuario.usuario,rol_usuario.id_rol).subscribe(
        () => {
          this.remove()
this.actualizarRolesUsuario();
        },

        error => {
          this.error = this.ts.instant("gestion-roles-usuario.eliminar-error");
        }
      )
     
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-roles-usuarios/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
