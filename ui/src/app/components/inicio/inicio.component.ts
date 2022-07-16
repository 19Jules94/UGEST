import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public readonly userForm: FormGroup;
  public isLogin: boolean;
  public error?: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    public ts: TranslateService
  ) {

    this.userForm = new FormGroup({
      dni: new FormControl('', [
        Validators.required
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])

    });

    this.isLogin = true;

  }

  ngOnInit(): void {
  }

  onSubmit() {
    const dniValue = this.userForm.get("dni")?.value;
    const passwordValue = this.userForm.get("password")?.value;

    console.log(dniValue);
    console.log(passwordValue)
    this.authenticationService.login(dniValue, passwordValue)
    .subscribe(
      value => {
        this.router.navigate(['/panel-principal']);
      },
      error => {
        console.log(error)
        this.error = this.ts.instant('login.error');
      }
    )

  }
}
