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
      this.actualizarTutorias();
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-tutorias/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }

}
