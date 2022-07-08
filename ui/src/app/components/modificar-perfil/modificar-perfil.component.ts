import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { GestionarUsuarioService } from 'src/app/services/gestionar-usuario.service';
import {TranslateService} from "@ngx-translate/core";
import { Profile } from 'src/app/models/Profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent implements OnInit {

  public readonly passForm: FormGroup;
  public error?: string;

  constructor(  private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionUsuariosService: GestionarUsuarioService,
    private  authenticationService:AuthenticationService,
    public ts: TranslateService) {  this.passForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ])

    }
  ) }

  ngOnInit(): void {
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
    public getUsuario(): Profile | undefined {
      return this.authenticationService.getProfile();
    }
  onSubmit() {
    const emailValue = this.passForm.get("email")?.value;
    const passwordValue = this.passForm.get("password")?.value;

    console.log(emailValue,passwordValue);
    this.gestionUsuariosService.editPasswordEmail(emailValue,passwordValue)
      .subscribe(
        value => {
          this.router.navigate(['/perfil']);
        },
        error => {
          switch (error.message) {
            default:
              this.error = this.ts.instant('profile.edit-error');
              console.log(error.message)
              break;
          }
        }
      )
  }
}
