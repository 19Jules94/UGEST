import {Component, OnInit} from '@angular/core';
import {GestionAccionesService} from "../../../services/gestion-acciones.service";
import { Accion } from 'src/app/models/Gestion-acciones/Accion';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-mostrar-acciones',
  templateUrl: './mostrar-acciones.component.html',
  styleUrls: ['./mostrar-acciones.component.css']
})
export class MostrarAccionesComponent implements OnInit {
  public acciones?: Array<Accion>;


  constructor(private readonly gestionAccionesService: GestionAccionesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public ts: TranslateService,
    private readonly authenticationService: AuthenticationService) { }
    
  hasFuncionalidadAccion(func:string, action:string): boolean{
    return this.authenticationService.hasFuncionalidadAction(func, action);
  }
  ngOnInit(): void {
    this.actualizarAcciones();
  }
  actualizarAcciones() {
    this.gestionAccionesService.mostrarTodas().subscribe(acciones => this.acciones = acciones.acciones);
  }

}
