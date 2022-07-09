import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {GestionPermisosService} from 'src/app/services/gestion-permisos.service';
import { Roles_Info_Add } from 'src/app/models/Gestion-permisos/Roles-info-Add';
import { Funcionalidades_Info } from 'src/app/models/Gestion-permisos/Funcionalidades-info';
import { Acciones_Info } from 'src/app/models/Gestion-permisos/Acciones-info';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-permiso',
  templateUrl: './add-permiso.component.html',
  styleUrls: ['./add-permiso.component.css']
})
export class AddPermisoComponent implements OnInit {

  public readonly rolPermisoForm: FormGroup;

  public roles?: Array<Roles_Info_Add>;
  public funcionalidades?: Array<Funcionalidades_Info>;
  public acciones?: Array<Acciones_Info>;

  public error?: string;

  constructor(private readonly gestionPermisosService: GestionPermisosService,
              public ts: TranslateService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {

    this.rolPermisoForm = new FormGroup({

        rol_id: new FormControl('', [
          Validators.required
        ]),

        funcionalidad_id: new FormControl('', [
          Validators.required
        ]),

        accion_id: new FormControl('', [
          Validators.required
        ])

      }
    )

  }

  ngOnInit(): void {
    this.info_add();
  }
  info_add(): void {
    this.gestionPermisosService.info_add().subscribe(
      value => {
        this.roles = value.roles;
        this.funcionalidades = value.funcionalidades;
        this.acciones = value.acciones;
      }
    )
  }

  onSubmit() {

    const accion_id = this.rolPermisoForm.get("accion_id")?.value;
    const funcionalidad_id = this.rolPermisoForm.get("funcionalidad_id")?.value;
    const rol_id = this.rolPermisoForm.get("rol_id")?.value;

    this.gestionPermisosService.addPermiso(rol_id, funcionalidad_id, accion_id)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-permisos/showall'], {queryParams: {flashok: this.ts.instant("gestion-roles.add-ok")}});
        },
        error => {
          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-permisos.add-error-duplicate');
              break;
            case '4004':
              this.error = this.ts.instant('gestion-permisos.add-error-object');
              break;
            default:
              this.error = this.ts.instant('gestion-permisos.add-error');
              break;
          }
        }
      )
  }
}
