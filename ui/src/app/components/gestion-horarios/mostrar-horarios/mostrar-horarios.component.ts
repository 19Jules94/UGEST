import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Horario } from 'src/app/models/Gestion-horarios/Horario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GestionHorariosService } from 'src/app/services/gestion-horarios.service';

@Component({
  selector: 'app-mostrar-horarios',
  templateUrl: './mostrar-horarios.component.html',
  styleUrls: ['./mostrar-horarios.component.css']
})
export class MostrarHorariosComponent implements OnInit {

  public horarios?: Array<Horario>;
  public error?:string;
  constructor(private readonly gestionHorarios: GestionHorariosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }


  tieneFuncionalidadAction(func:string, action:string): boolean{
      return this.authenticationService.tieneFuncionalidadAction(func, action);
    }
  ngOnInit(): void {
    
    this.actualizarHorarios();
    
  }
  private actualizarHorarios() {
    this.gestionHorarios.mostrartodos().subscribe(horarios => this.horarios = horarios.horarios);
    
  }
  deleteHorario(horario: Horario) {
    if (horario) {
      this.gestionHorarios.deleteHorario(horario.id).subscribe(
        () => {
          this.remove()
this.actualizarHorarios();
        },

        error => {
          switch (error.message) {
            case '4001':
              this.error = this.ts.instant("gestion-horarios.eliminar-error-foreign-key");
              break;
            default:
              this.error =  this.ts.instant("gestion-horarios.eliminar-error");
              break;
          }
        }
      )
      
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-horarios/showall']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
