import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

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

  hasFuncionalidad(func: string){
    return this.authenticationService.hasFuncionalidad(func);
  }

}
