import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Roles_Info_Add_RU } from 'src/app/models/Gestion-roles-usuario/Roles-info-add-RU';
import { Usuarios_Info_Add_RU } from 'src/app/models/Gestion-roles-usuario/Usuarios-info-add-RU';
import { GestionRolesUsuarioService } from 'src/app/services/gestion-roles-usuario.service';

@Component({
  selector: 'app-add-rol-usuario',
  templateUrl: './add-rol-usuario.component.html',
  styleUrls: ['./add-rol-usuario.component.css']
})
export class AddRolUsuarioComponent implements OnInit {

  public readonly rolUsuarioForm: FormGroup;
  public usuariosSelect?: Array<Usuarios_Info_Add_RU>;
  public rolesSelect?: Array<Roles_Info_Add_RU>;
  public error?: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly gestionRolesUsuario: GestionRolesUsuarioService,
              public ts: TranslateService) {

    this.rolUsuarioForm = new FormGroup({

        usuario_id: new FormControl('', [
          Validators.required
        ]),

        rol_id: new FormControl('', [
          Validators.required
        ])

      }
    )
  }

  ngOnInit(): void {
    this.info_add();
  }

  info_add(): void {
    this.gestionRolesUsuario.info_add().subscribe(
      value => {
        this.usuariosSelect = value.usuarios;
        this.rolesSelect = value.roles;
      }
    )
  }


  onSubmit() {
    const usuario_id = this.rolUsuarioForm.get("usuario_id")?.value;
    const rol_id = this.rolUsuarioForm.get("rol_id")?.value;

    this.gestionRolesUsuario.addRolUsuario(usuario_id, rol_id)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-roles-usuarios/showall']);
        },
        error => {
          switch (error.message){
            case '4002':
              this.error = this.ts.instant('gestion-roles-usuario.add-error-duplicado');
              break;
            case '4004':
              this.error = this.ts.instant('gestion-roles-usuario.add-error-no-existe');
              break;
            default:
              this.error = this.ts.instant('gestion-roles-usuario.add-error');
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
