import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Edificio } from 'src/app/models/Gestion-edificios/Edificio';
import { GestionEspaciosService } from 'src/app/services/gestion-espacios.service';

@Component({
  selector: 'app-add-espacio',
  templateUrl: './add-espacio.component.html',
  styleUrls: ['./add-espacio.component.css']
})
export class AddEspacioComponent implements OnInit {

  public readonly espacioForm: FormGroup;
  public edificioSelect?: Array<Edificio>;
  public error?: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly gestionEspacios: GestionEspaciosService,
              public ts: TranslateService) {

    this.espacioForm = new FormGroup({

        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.pattern("^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,60}$")
        ]),

        tipo: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,60}$")
        ]),

        edificio: new FormControl('', [
          Validators.required
        ]),
      }
    )

  }

  ngOnInit(): void {
    this.gestionEspacios.info_add().subscribe(value => this.edificioSelect = value.edificios)
  }

  onSubmit() {
    const nombre = this.espacioForm.get("nombre")?.value;
    const tipo = this.espacioForm.get("tipo")?.value;
    const edificio = this.espacioForm.get("edificio")?.value;

    this.gestionEspacios.addAEspacio(nombre, tipo, edificio)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-espacios/showall'], {queryParams: {flashok: this.ts.instant("gestion-espacios.add-ok")}});
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-espacios.add-error-duplicado');
              break;
            default:
              this.error = this.ts.instant('gestion-espacios.add-error');
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
