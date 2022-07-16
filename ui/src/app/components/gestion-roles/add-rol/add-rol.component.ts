import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {TranslateService} from "@ngx-translate/core";
import { Roles } from 'src/app/models/Gestion-roles/Roles';
import {GestionRolesService} from "../../../services/gestion-roles.service";
import { Rol } from 'src/app/models/Gestion-roles/Rol';
@Component({
  selector: 'app-add-rol',
  templateUrl: './add-rol.component.html',
  styleUrls: ['./add-rol.component.css']
})
export class AddRolComponent implements OnInit {

  public readonly rolForm: FormGroup;
  public error?: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionRolesService: GestionRolesService,
    public ts: TranslateService
  ) {

    this.rolForm = new FormGroup({

        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{0,20}$")
        ])

      }
    )

  }

  ngOnInit(): void {
  }
  onSubmit() {
    const nombreValue = this.rolForm.get("nombre")?.value;

    this.gestionRolesService.addRol(nombreValue)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-roles/showall']);
        },
        error => {
            switch (error.message){
              case '4002':
                this.error = this.ts.instant('gestion-roles.add-error-name');
                break;
              default:
                this.error = this.ts.instant('gestion-roles.add-error');
                break;
            }
        }
      )

  }
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
    this.error = undefined;
  }
}
