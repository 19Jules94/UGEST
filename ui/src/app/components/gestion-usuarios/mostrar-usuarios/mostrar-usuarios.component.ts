import {Component, OnInit} from '@angular/core';
import { GestionarUsuarioService } from 'src/app/services/gestionar-usuario.service';
import { Usuario } from 'src/app/models/Gestion-usuario/Usuario';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.component.html',
  styleUrls: ['./mostrar-usuarios.component.css']
})
export class MostrarUsuariosComponent implements OnInit {
  public usuarios?: Array<Usuario>;
  public error?:string;
  constructor(private readonly gestionarUsuarioService: GestionarUsuarioService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService,
    
) {

}

  ngOnInit(): void {
    this.actualizarUsuarios();
  }
  tieneFuncionalidadAction(func:string, action:string): boolean{
    return this.authenticationService.tieneFuncionalidadAction(func, action);
  }

 

  actualizarUsuarios() {
    this.gestionarUsuarioService.mostrarTodos().subscribe(usuarios => this.usuarios = usuarios.usuarios);
  }
  deleteUsuario(usuario: Usuario) {
    if (usuario) {
      this.gestionarUsuarioService.deleteUsuario(usuario.dni).subscribe(
        () => {
          this.remove()
this.actualizarUsuarios();
        },

        error => {
          switch (error.message) {
            case '4001':
              this.error = this.ts.instant("gestion-usuarios.eliminar-error-foreign");
              break;
            default:
              this.error = this.ts.instant("gestion-usuarios.eliminar-error");
              break;
          }
        }
      )
     
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-usuarios/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
