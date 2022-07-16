import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Asignatura } from 'src/app/models/Gestion-asignaturas/Asignatura';
import { Centro } from 'src/app/models/Gestion-centros/Centro';
import { Espacio } from 'src/app/models/Gestion-espacios/Espacio';
import { Grupo } from 'src/app/models/Gestion-grupos/Grupo';
import { Horario } from 'src/app/models/Gestion-horarios/Horario';
import { Profesor } from 'src/app/models/Gestion-Profesores/Profesor';
import { Titulacion } from 'src/app/models/Gestion-titulaciones/Titulacion';
import { GestionHorariosService } from 'src/app/services/gestion-horarios.service';

@Component({
  selector: 'app-edit-horario',
  templateUrl: './edit-horario.component.html',
  styleUrls: ['./edit-horario.component.css']
})
export class EditHorarioComponent implements OnInit {

  
  dias_semana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  public readonly horarioForm: FormGroup;
  public asignaturaSelect?: Array<Asignatura>;
  public grupoSelect?: Array<Grupo>;
  public espacioSelect?: Array<Espacio>;
  public titulacionSelect?: Array<Titulacion>;
  public profesorSelect?: Array<Profesor>;
  public ogAsignaturas?: Array<Asignatura>;
  public ogGrupos?: Array<Grupo>;
  public defaultDate?: Date;
  public error?: string;
  public horario?: Horario;
  anhoSelected?: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly gestionHorarios: GestionHorariosService,
              public ts: TranslateService) {


    this.horarioForm = new FormGroup({
        asignatura: new FormControl('', [
          Validators.required
        ]),

        grupo: new FormControl('', [
          Validators.required
        ]),

        fecha: new FormControl('', [
          Validators.required
        ]),

        profesor: new FormControl('', [
          Validators.required
        ]),

        espacio: new FormControl('', [
          Validators.required
        ]),

        hora_inicio: new FormControl('', [
          Validators.required
        ]),

        hora_fin: new FormControl('', [
          Validators.required
        ]),


        titulacion: new FormControl('', [
          Validators.required
        ])
      }
    )
  }

  ngOnInit(): void {
    this.gestionHorarios.info_add()
      .subscribe(value => {
        this.titulacionSelect = value.titulaciones
        this.asignaturaSelect = value.asignaturas
        this.grupoSelect = value.grupos
        this.espacioSelect = value.espacios
        this.profesorSelect = value.profesores
        this.ogAsignaturas = value.asignaturas
        this.ogGrupos = value.grupos
      })

    this.route.queryParams
      .subscribe(params => {
          this.gestionHorarios.show(this.route.snapshot.paramMap.get('id')!)
            .subscribe(value => {
                this.horario = value;

                this.horarioForm.get("grupo")?.setValue(this.horario.grupo);
                this.horarioForm.get("espacio")?.setValue(this.horario.espacio);
                this.horarioForm.get("profesor")?.setValue(this.horario.profesor);
                this.horarioForm.get("asignatura")?.setValue(this.horario.asignatura);
                this.horarioForm.get("titulacion")?.setValue(this.horario.titulacion);
                this.horarioForm.get("fecha")?.setValue(this.horario.fecha);
                this.horarioForm.get("hora_inicio")?.setValue(this.horario.hora_inicio);
                this.horarioForm.get("hora_fin")?.setValue(this.horario.hora_fin);
                this.anhoSelected = this.horario.anho;

              }
            )
        }
      );

  }


  getAsignaturas(titulacion: Titulacion) {
    this.asignaturaSelect = this.ogAsignaturas;
    this.asignaturaSelect = this.asignaturaSelect?.filter(asignaturas => asignaturas.titulacion == titulacion.id)
  }

  getGrupos(asignatura: Asignatura) {
    this.grupoSelect = this.ogGrupos;
    this.grupoSelect = this.grupoSelect?.filter(grupos => grupos.asignatura == asignatura.id)
  }

  onSubmit() {
    const grupo = this.horarioForm.get("grupo")?.value;
    const espacio = this.horarioForm.get("espacio")?.value;
    const profesor = this.horarioForm.get("profesor")?.value;
    const asignatura = this.horarioForm.get("asignatura")?.value;
    const titulacion = this.horarioForm.get("titulacion")?.value;
    const fecha = this.horarioForm.get("fecha")?.value;
    const hora_inicio = this.horarioForm.get("hora_inicio")?.value;
    const hora_fin = this.horarioForm.get("hora_fin")?.value;
    const asistencia = this.horarioForm.get("asistencia")?.value;
    const dia = this.dias_semana[new Date(this.horarioForm.get("fecha")?.value).getDay()]
    const titulacionCompleta = this.titulacionSelect?.find(value => value.id = titulacion);

   

    this.gestionHorarios.editHorario(this.horario!.id, titulacion, titulacionCompleta!.anho_id, asignatura, grupo, profesor,
      espacio, "Pendiente", hora_inicio, hora_fin, dia, fecha)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-horarios/showall'], {queryParams: {flashok: this.ts.instant("gestion-horarios.edit-ok")}});
        },
        error => {

          switch (error.message) {

            case '40011':
              this.error = this.ts.instant('gestion-horarios.edit-error-esp-ocupado');
              break;

            case '40012':
              this.error = this.ts.instant('gestion-horarios.edit-error-gru-ocupado');
              break;

            case '40013':
              this.error = this.ts.instant('gestion-horarios.edit-error-pro-ocupado');
              break;

            case '4001':
              this.error = this.ts.instant('gestion-horarios.edit-error-ocupado');
              break;

            case '4002':
              this.error = this.ts.instant('gestion-horarios.edit-error-duplicado');
              break;

            case '4004':
              this.error = this.ts.instant('gestion-horarios.edit-error-integridad');
              break;
            default:
              this.error = this.ts.instant('gestion-horarios.edit-error');
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
