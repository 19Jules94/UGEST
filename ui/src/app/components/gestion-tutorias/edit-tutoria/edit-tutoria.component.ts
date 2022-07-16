import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AAcademico } from 'src/app/models/Gestion-AAcademico/AAcademico';
import { Espacio } from 'src/app/models/Gestion-espacios/Espacio';
import { Profesor } from 'src/app/models/Gestion-Profesores/Profesor';
import { GestionTutoriasService } from 'src/app/services/gestion-tutorias.service';

@Component({
  selector: 'app-edit-tutoria',
  templateUrl: './edit-tutoria.component.html',
  styleUrls: ['./edit-tutoria.component.css']
})
export class EditTutoriaComponent implements OnInit {

  public readonly tutoriaForm: FormGroup;
  public profesorSelect?: Array<Profesor>;
  public anhoSelect?: Array<AAcademico>;
  public espaciosSelect?: Array<Espacio>;
  public error?: string;
  public id?: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly gestionTutoriasService: GestionTutoriasService,
              public ts: TranslateService) {


    this.tutoriaForm = new FormGroup({

        anho: new FormControl('', [
          Validators.required
        ]),

        profesor: new FormControl('', [
          Validators.required
        ]),

        espacio: new FormControl('', [
          Validators.required
        ]),

        asistencia: new FormControl('', [
          Validators.required
        ]),

        fecha: new FormControl('', [
          Validators.required
        ]),

        hora_inicio: new FormControl('', [
          Validators.required
        ]),

        hora_fin: new FormControl('', [
          Validators.required
        ])
      }
    )
  }


  ngOnInit(): void {
    this.gestionTutoriasService.info_add().subscribe(
      value => {
        this.anhoSelect = value.anho_academicos,
          this.profesorSelect = value.profesores,
          this.espaciosSelect = value.espacios
      }
    )

    this.route.queryParams
      .subscribe(params => {
          this.id = this.route.snapshot.paramMap.get('id')!;
          this.gestionTutoriasService.show(this.id)
            .subscribe(value => {
                this.tutoriaForm.get("hora_fin")?.setValue(value.hora_fin);
                this.tutoriaForm.get("hora_inicio")?.setValue(value.hora_inicio);
                this.tutoriaForm.get("fecha")?.setValue(value.fecha);
                this.tutoriaForm.get("asistencia")?.setValue(value.asistencia);
                this.tutoriaForm.get("espacio")?.setValue(value.espacio_id);
                this.tutoriaForm.get("profesor")?.setValue(value.profesor);
                this.tutoriaForm.get("anho")?.setValue(value.anhoacademico_id);

              }
            )
        }
      );
  }

  onSubmit() {
    const anho = this.tutoriaForm.get("anho")?.value;
    const profesor = this.tutoriaForm.get("profesor")?.value;
    const espacio = this.tutoriaForm.get("espacio")?.value;
    const asistencia = this.tutoriaForm.get("asistencia")?.value;
    const fecha = this.tutoriaForm.get("fecha")?.value;
    const hora_inicio = this.tutoriaForm.get("hora_inicio")?.value;
    const hora_fin = this.tutoriaForm.get("hora_fin")?.value;


    this.gestionTutoriasService.editTutoria(this.id!, anho, profesor, espacio, asistencia, fecha, hora_inicio, hora_fin)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-tutorias/showall'], {queryParams: {flashok: this.ts.instant("gestion-tutorias.edit-ok")}});
        },
        error => {

          switch (error.message) {
            case '40011':
              this.error = this.ts.instant('gestion-tutorias.edit-error-esp-ocupado');
              break;
            case '40013':
              this.error = this.ts.instant('gestion-tutorias.edit-error-pro-ocupado');
              break;
            case '4002':
              this.error = this.ts.instant('gestion-tutorias.edit-error-duplicado');
              break;
            case '4004':
              this.error = this.ts.instant('gestion-tutorias.edit-error-integridad');
              break;
            default:
              this.error = this.ts.instant('gestion-tutorias.edit-error');
              break;
          }
        }
      )

  }

}
