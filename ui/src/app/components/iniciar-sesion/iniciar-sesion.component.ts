import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute,Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  public readonly userForm: FormGroup;
  public isLogin: boolean;
  

  public error?:string;
  
  constructor(  
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService) {   this.userForm = new FormGroup({
      dni: new FormControl('', [
        Validators.required
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ])

    });

    this.isLogin = true;}

  ngOnInit(): void {
  }
  onSubmit() {
    const dniValue = this.userForm.get("dni")?.value;
    const passwordValue = this.userForm.get("password")?.value;


    this.authenticationService.login(dniValue, passwordValue)
    .subscribe(
      value => {
       console.log("ok");
      },
      error => {
        console.log("errpr");
      }
    )

  }
}
