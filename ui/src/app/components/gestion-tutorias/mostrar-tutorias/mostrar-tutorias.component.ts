import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Tutoria } from 'src/app/models/Gestion-tutorias/Tutoria';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GestionTutoriasService } from 'src/app/services/gestion-tutorias.service';

@Component({
  selector: 'app-mostrar-tutorias',
  templateUrl: './mostrar-tutorias.component.html',
  styleUrls: ['./mostrar-tutorias.component.css']
})
export class MostrarTutoriasComponent implements OnInit {

  public tutorias?: Array<Tutoria>;
  public error?:string;
  constructor(private readonly gestionTutorias: GestionTutoriasService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }


  tieneFuncionalidadAction(func:string, action:string): boolean{
      return this.authenticationService.tieneFuncionalidadAction(func, action);
    }
  ngOnInit(): void {
    
    this.actualizarTutorias();
    
  }
  private actualizarTutorias() {
    this.gestionTutorias.mostrartodas().subscribe(tutorias => this.tutorias = tutorias.tutorias);
    
  }
  deleteTutoria(tutoria: Tutoria) {
    if (tutoria) {
      this.gestionTutorias.deleteTutoria(tutoria.id).subscribe(
        () => {
          this.remove()
this.actualizarTutorias();
        },

        error => {
          switch (error.message) {
            case '4001':
              this.error =this.ts.instant("gestion-tutorias.eliminar-error-foreign-key");
              break;
            default:
              this.error = this.ts.instant("gestion-tutorias.eliminar-error");
              break;
          }
        }
      )
      
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-tutorias/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
 
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
