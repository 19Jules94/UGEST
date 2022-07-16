import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Universidad } from 'src/app/models/Gestion-Universidades/Universidad';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionEdificiosService } from '../../../services/gestion-edificios.service';
import { TranslateService } from '@ngx-translate/core';
import { Edificio } from 'src/app/models/Gestion-edificios/Edificio';

@Component({
  selector: 'app-edit-edificio',
  templateUrl: './edit-edificio.component.html',
  styleUrls: ['./edit-edificio.component.css'],
})
export class EditEdificioComponent implements OnInit {
  public readonly edificioForm: FormGroup;
  public universidadSelect?: Array<Universidad>;
  public error?: string;
  edificio?: Edificio;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionEdificiosService: GestionEdificiosService,
    public ts: TranslateService
  ) {
    this.edificioForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,60}$'),
      ]),

      ubicacion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,100}$'),
      ]),

      universidad: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.gestionEdificiosService
      .info_add()
      .subscribe((value) => (this.universidadSelect = value.universidades));

    this.route.queryParams.subscribe((params) => {
      this.gestionEdificiosService
        .show(this.route.snapshot.paramMap.get('id')!)
        .subscribe((edi) => {
          this.edificio = edi;
          this.edificioForm.get('nombre')?.setValue(this.edificio.nombre);
          this.edificioForm.get('ubicacion')?.setValue(this.edificio.ubicacion);
          this.edificioForm
            .get('universidad')
            ?.setValue(this.edificio.universidad);
        });
    });
  }
  onSubmit() {
    if (this.edificio) {
      const nombre = this.edificioForm.get('nombre')?.value;
      const ubicacion = this.edificioForm.get('ubicacion')?.value;
      const universidad = this.edificioForm.get('universidad')?.value;

      this.gestionEdificiosService
        .editEdificio(this.edificio.id, nombre, ubicacion, universidad)
        .subscribe(
          (value) => {
            this.router.navigate([
              '/panel-principal/gestion-edificios/showall',
            ]);
          },
          (error) => {
            switch (error.message) {
              case '4002':
                this.error = this.ts.instant(
                  'gestion-edificios.edit-error-duplicado'
                );
                break;
              default:
                this.error = this.ts.instant('gestion-edificios.edit-error');
                break;
            }
          }
        );
    }
  }
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
    this.error = undefined;
  }
}
