import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Centro } from 'src/app/models/Gestion-centros/Centro';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GestionCentrosService } from 'src/app/services/gestion-centros.service';

@Component({
  selector: 'app-mostrar-centro',
  templateUrl: './mostrar-centro.component.html',
  styleUrls: ['./mostrar-centro.component.css']
})
export class MostrarCentroComponent implements OnInit {
  public centros?: Array<Centro>;
  public error?:string;
  constructor(private readonly gestionCentrosService: GestionCentrosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.actualizarCentros();
  }
  tieneFuncionalidadAction(func:string, action:string): boolean{
    return this.authenticationService.tieneFuncionalidadAction(func, action);
  }

  private actualizarCentros() {
    this.gestionCentrosService.mostrarTodos().subscribe(centros => this.centros = centros.centros)
  }

  deleteCentro(centro: Centro) {
    if (centro) {
      this.gestionCentrosService.deleteCentro(centro.id).subscribe(
        () => {
          this.remove()
          this.actualizarCentros();

        },

        error => {
          this.error = this.ts.instant("gestion-centros.eliminar-error");
        }
      )
      
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-centros']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
