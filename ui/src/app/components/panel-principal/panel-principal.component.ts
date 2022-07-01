import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import { Profile } from 'src/app/models/Profile';
@Component({
  selector: 'app-panel-principal',
  templateUrl: './panel-principal.component.html',
  styleUrls: ['./panel-principal.component.css']
})
export class PanelPrincipalComponent implements OnInit {

  constructor(
    private readonly authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

 tieneFuncionalidad(func: string){
    return this.authenticationService.tieneFuncionalidad(func);
  }
  public getUsuario(): Profile | undefined {
    return this.authenticationService.getProfile();
  }

}
