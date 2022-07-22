import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Universidad } from 'src/app/models/Gestion-Universidades/Universidad';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GestionUniversidadesService } from 'src/app/services/gestion-universidades.service';

@Component({
  selector: 'app-mostrar-universidad',
  templateUrl: './mostrar-universidad.component.html',
  styleUrls: ['./mostrar-universidad.component.css']
})
export class MostrarUniversidadComponent implements OnInit {

  public universidades?: Array<Universidad>;
  public error?:string;
  constructor(private readonly gestionUniversidades: GestionUniversidadesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.actualizarUniversidades();
  }
  tieneFuncionalidadAction(func:string, action:string): boolean{
    return this.authenticationService.tieneFuncionalidadAction(func, action);
  }

  private actualizarUniversidades() {
    this.gestionUniversidades.mostrarTodas().subscribe(universidades => this.universidades = universidades.universidades)
  }

  deleteUniversidad(universidad: Universidad) {
    if (universidad) {
      this.gestionUniversidades.deleteUniversidad(universidad.id).subscribe(
        () => {
          this.remove()
        this.actualizarUniversidades();
        },
        error => {
          this.error =this.ts.instant("gestion-universidades.eliminar-error") ;
        }
      )
      
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-universidades']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }

  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
