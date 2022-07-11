import {Component, OnInit} from '@angular/core';
import { Profesor } from 'src/app/models/Gestion-Profesores/Profesor';
import {GestionEd}
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GestionProfesoresService} from "../../../services/gestion-profesores.service";
import {Edificio} from "../../../models/gestion-edificios/Edificio";

@Component({
  selector: 'app-mostrar-profesores',
  templateUrl: './mostrar-profesores.component.html',
  styleUrls: ['./mostrar-profesores.component.css']
})
export class MostrarProfesoresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
