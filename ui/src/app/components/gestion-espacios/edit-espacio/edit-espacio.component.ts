import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Edificio } from 'src/app/models/Gestion-edificios/Edificio';
import { Espacio } from 'src/app/models/Gestion-espacios/Espacio';
import { GestionEspaciosService } from 'src/app/services/gestion-espacios.service';

@Component({
  selector: 'app-edit-espacio',
  templateUrl: './edit-espacio.component.html',
  styleUrls: ['./edit-espacio.component.css']
})
export class EditEspacioComponent implements OnInit {

  public readonly espacioForm: FormGroup;
  public edificioSelect?: Array<Edificio>;
  public error?: string;
  espacio?:Espacio;

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

    this.route.queryParams
      .subscribe(params => {
          console.log(this.route.snapshot.paramMap.get('id'));
          this.gestionEspacios.show(this.route.snapshot.paramMap.get('id')!)
            .subscribe(esp => {
                this.espacio = esp;
                this.espacioForm.get("nombre")?.setValue(this.espacio.nombre);
                this.espacioForm.get("tipo")?.setValue(this.espacio.tipo);
                this.espacioForm.get("edificio")?.setValue(this.espacio.edificio);
              }
            )
        }
      );
  }

  onSubmit() {
    if (this.espacio) {
      const nombre = this.espacioForm.get("nombre")?.value;
      const tipo = this.espacioForm.get("tipo")?.value;
      const edificio = this.espacioForm.get("edificio")?.value;

      this.gestionEspacios.editEspacio(this.espacio.id, nombre, tipo, edificio)
        .subscribe(
          value => {
            this.router.navigate(['/panel-principal/gestion-espacios/showall'], {queryParams: {flashok: this.ts.instant("gestion-espacios.edit-ok")}});
          },
          error => {

            switch (error.message) {
              case '4002':
                this.error = this.ts.instant('gestion-espacios.edit-error-duplicado');
                break;
              default:
                this.error = this.ts.instant('gestion-espacios.edit-error');
                break;
            }
          }
        )
    }
  }

}
