import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { Funcionalidades } from 'src/app/models/Gestion-funcionalidades/Funcionalidades';
import { GestionFuncionalidadesService } from 'src/app/services/gestion-funcionalidades.service';
import { Funcionalidad } from 'src/app/models/Gestion-funcionalidades/Funcionalidad';

@Component({
  selector: 'app-add-funcionalidad',
  templateUrl: './add-funcionalidad.component.html',
  styleUrls: ['./add-funcionalidad.component.css']
})
export class AddFuncionalidadComponent implements OnInit {
  public readonly funcionalidadForm: FormGroup;
  public error?: string;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionFuncionalidadesService: GestionFuncionalidadesService,
    public ts: TranslateService
  ) {
    this.funcionalidadForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{0,20}$'),
      ]),

      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(300),
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{0,300}$'),
      ]),
    });
  }
  onSubmit() {
    const nombreValue = this.funcionalidadForm.get("nombre")?.value;
    const descripcionValue = this.funcionalidadForm.get("descripcion")?.value;

    this.gestionFuncionalidadesService.addFuncionalidad(nombreValue, descripcionValue)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-funcionalidades/showall']);
        },
        error => {
          switch (error.message){
            case '4002':
              this.error = this.ts.instant('gestion-funcionalidades.add-error-name');
              break;
            default:
              this.error = this.ts.instant('gestion-funcionalidades.add-error');
              break;
          }

        }
      )

  }
  ngOnInit(): void {}
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
    this.error = undefined;
  }
}
