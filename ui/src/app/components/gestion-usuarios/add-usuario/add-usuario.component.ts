import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {TranslateService} from "@ngx-translate/core";
import { Usuarios } from 'src/app/models/Gestion-usuario/Usuarios';
import { GestionarUsuarioService } from 'src/app/services/gestionar-usuario.service';
import { Usuario } from 'src/app/models/Gestion-usuario/Usuario';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {
  public readonly usuarioForm: FormGroup;
  public error?: string;
  constructor(  private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionarUsuariosService: GestionarUsuarioService,
    public ts: TranslateService
  ) {

    this.usuarioForm = new FormGroup({

      dni: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("^[0-9]{8}[A-Z]{1}$$")
      ]),

        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,20}$")
        ]),

        apellidos: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,20}$")
        ]),

      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ])

      }
    )

  }

  ngOnInit(): void {
  }

  onSubmit() {
    const dniValue = this.usuarioForm.get("dni")?.value;
    const nombreValue = this.usuarioForm.get("nombre")?.value;
    const apellidosValue = this.usuarioForm.get("apellidos")?.value;
    const emailValue = this.usuarioForm.get("email")?.value;
    const passwordValue = this.usuarioForm.get("password")?.value;

    this.gestionarUsuariosService.addUsuario(dniValue, nombreValue, apellidosValue,emailValue, passwordValue)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-usuarios/showall']);
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-usuarios.add-error-name');
              break;
            default:
              this.error = this.ts.instant('gestion-usuarios.add-error');
              break;
          }
        }
      )

  }

}
