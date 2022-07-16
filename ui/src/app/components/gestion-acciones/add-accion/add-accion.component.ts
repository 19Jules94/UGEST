import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { Acciones } from 'src/app/models/Gestion-acciones/Acciones';
import { GestionAccionesService } from '../../../services/gestion-acciones.service';
import { Accion } from 'src/app/models/Gestion-acciones/Accion';

@Component({
  selector: 'app-add-accion',
  templateUrl: './add-accion.component.html',
  styleUrls: ['./add-accion.component.css'],
})
export class AddAccionComponent implements OnInit {
  public readonly accionForm: FormGroup;
  public error?: string;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionAccionesService: GestionAccionesService,
    public ts: TranslateService
  ) {
    this.accionForm = new FormGroup({
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
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{0,200}$'),
      ]),
    });
  }
  onSubmit() {
    const nombreValue = this.accionForm.get("nombre")?.value;
    const descripcionValue = this.accionForm.get("descripcion")?.value;

    this.gestionAccionesService.addAccion(nombreValue, descripcionValue)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-acciones/showall']);
        },
        error => {
          switch (error.message){
            case '4002':
              this.error = this.ts.instant('gestion-acciones.add-error-name');
              break;
            default:
              this.error = this.ts.instant('gestion-acciones.add-error');
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
  ngOnInit(): void {}
}
