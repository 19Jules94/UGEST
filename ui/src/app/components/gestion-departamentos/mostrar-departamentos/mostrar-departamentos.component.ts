import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Departamento } from 'src/app/models/Gestion-departamentos/Departamento';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GestionDepartamentosService } from 'src/app/services/gestion-departamentos.service';

@Component({
  selector: 'app-mostrar-departamentos',
  templateUrl: './mostrar-departamentos.component.html',
  styleUrls: ['./mostrar-departamentos.component.css']
})
export class MostrarDepartamentosComponent implements OnInit {

  public departamentos?: Array<Departamento>;
  public error?:string;
  constructor(private readonly gestionDepartamentos: GestionDepartamentosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.actualizarDepartamentos();
  }
  tieneFuncionalidadAction(func:string, action:string): boolean{
    return this.authenticationService.tieneFuncionalidadAction(func, action);
  }

  private actualizarDepartamentos() {
    this.gestionDepartamentos.mostrarTodos().subscribe(departamentos => this.departamentos = departamentos.departamentos)
  }

  deleteDepartamento(departamento: Departamento) {
    if (departamento) {
      this.gestionDepartamentos.deleteDepartamento(departamento.id).subscribe(
        () => {
          this.remove()
this.actualizarDepartamentos();
        },

        error => {
          this.error = this.ts.instant("gestion-departamentos.eliminar-error");
        
        }
      )
      
    }
  }  
  private remove() {
    this.router.navigate(['/panel-principal/gestion-departamentos']);
    window.scrollTo({top: 0, behavior: 'smooth'});
  
  }
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
  this.error = undefined;
  }
}
