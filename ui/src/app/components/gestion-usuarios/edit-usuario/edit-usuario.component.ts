import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {TranslateService} from "@ngx-translate/core";
import { Usuarios } from 'src/app/models/Gestion-usuario/Usuarios';
import { GestionarUsuarioService } from 'src/app/services/gestionar-usuario.service';
import { Usuario } from 'src/app/models/Gestion-usuario/Usuario';
@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {
  public readonly usuarioForm: FormGroup;
  public error?: string;
  usuario?: Usuario;
  constructor(    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionarUsuarioService: GestionarUsuarioService,
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
          Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,200}$")
        ]),

        apellidos: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
          Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,200}$")
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


  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(this.route.snapshot.paramMap.get('dni'));
        this.gestionarUsuarioService.show(this.route.snapshot.paramMap.get('dni')!)
        .subscribe(usuario => {
          this.usuario = usuario;
          this.usuarioForm.get("dni")?.setValue(this.usuario.dni);
          this.usuarioForm.get("nombre")?.setValue(this.usuario.nombre);
          this.usuarioForm.get("apellidos")?.setValue(this.usuario.apellidos);
          this.usuarioForm.get("email")?.setValue(this.usuario.email);
          this.usuarioForm.get("password")?.setValue(this.usuario.password);
         }
        )
      }
      );
  }
  verPass(){
    var tipo = document.getElementById("pass") as HTMLInputElement || null;
    var ojo = document.getElementById("icon-show") as HTMLSpanElement;
    if(tipo.type=="password"){
      tipo.type="text"  ;
      ojo.innerHTML='<i class="fa-solid fa-eye"></i>';
    }else{
        ojo.innerHTML='<i class="fa-solid fa-eye-slash"></i>';
        tipo.type="password" ;
      
    }
    }
  onSubmit() {
    const dniValue = this.usuarioForm.get("dni")?.value;
    const nombreValue = this.usuarioForm.get("nombre")?.value;
    const apellidosValue = this.usuarioForm.get("apellidos")?.value;
    const emailValue = this.usuarioForm.get("email")?.value;
    const passValue = this.usuarioForm.get("password")?.value;
    this.gestionarUsuarioService.editUsuario(dniValue, nombreValue, apellidosValue,emailValue,passValue)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-usuarios/showall'], {queryParams: {flashok: this.ts.instant("gestion-usuarios.edit-ok")}});
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-usuarios.edit-error-name');
              break;
            default:
              this.error = this.ts.instant('gestion-usuarios.edit-error');
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
