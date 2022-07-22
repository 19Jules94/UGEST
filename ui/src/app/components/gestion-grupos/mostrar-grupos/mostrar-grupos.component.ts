import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Grupo } from 'src/app/models/Gestion-grupos/Grupo';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GestionGruposService } from 'src/app/services/gestion-grupos.service';

@Component({
  selector: 'app-mostrar-grupos',
  templateUrl: './mostrar-grupos.component.html',
  styleUrls: ['./mostrar-grupos.component.css']
})
export class MostrarGruposComponent implements OnInit {

  public grupos?: Array<Grupo>;
  public error?:string;
  constructor(private readonly gestionGrupos: GestionGruposService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }


  tieneFuncionalidadAction(func:string, action:string): boolean{
      return this.authenticationService.tieneFuncionalidadAction(func, action);
    }
  ngOnInit(): void {
    this.actualizarGrupos();
  }
  private actualizarGrupos() {
    this.gestionGrupos.mostrartodos().subscribe(grupos => this.grupos = grupos.grupos);
  }
  deleteGrupo(grupo: Grupo) {
    if (grupo) {
      this.gestionGrupos.deleteGrupo(grupo.id).subscribe(
        () => {
          this.remove()
this.actualizarGrupos();
        },

        error => {
          switch (error.message) {
            case '4001':
              this.error=this.ts.instant("gestion-grupos.eliminar-error-foreign-key");
              break;
            default:
              this.error =this.ts.instant("gestion-grupos.eliminar-error");
              break;
          }
        }
      )
      
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-grupos/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
