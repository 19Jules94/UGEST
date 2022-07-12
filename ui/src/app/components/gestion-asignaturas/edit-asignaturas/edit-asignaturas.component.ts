import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Asignatura } from 'src/app/models/Gestion-asignaturas/Asignatura';
import { Departamento } from 'src/app/models/Gestion-departamentos/Departamento';
import { Profesor } from 'src/app/models/Gestion-Profesores/Profesor';
import { Titulacion } from 'src/app/models/Gestion-titulaciones/Titulacion';
import { GestionAsignaturasService } from 'src/app/services/gestion-asignaturas.service';

@Component({
  selector: 'app-edit-asignaturas',
  templateUrl: './edit-asignaturas.component.html',
  styleUrls: ['./edit-asignaturas.component.css']
})
export class EditAsignaturasComponent implements OnInit {

  public readonly asignaturaForm: FormGroup;

  asignatura?: Asignatura;
  error?: string;
  titulacionSelect?: Array<Titulacion>;
  departamentoSelect?: Array<Departamento>;
  usuarioSelect?: Array<Profesor>;
  titulacionAux?: Titulacion;
  anhoSelected?: string;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    public gestionASignaturas: GestionAsignaturasService,
    public ts: TranslateService) {
    this.asignaturaForm = new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,255}$")
      ]),

      contenido: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern("^[^0-9]{3,255}$")
      ]),

      creditos: new FormControl('', [
        Validators.required
      ]),

      codigo: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}[0-9]{5}$")
      ]),

      tipo: new FormControl('', [
        Validators.required
      ]),

      horas: new FormControl('', [
        Validators.required
      ]),


      anhoacademico: new FormControl('', [
        Validators.required
      ]),

      cuatrimestre: new FormControl('', [
        Validators.required
      ]),
      departamento: new FormControl('', [
        Validators.required
      ]),

      titulacion: new FormControl('', [
        Validators.required
      ]),


      profesor: new FormControl('', [
        Validators.required
      ]),
    }
    )
  }

  ngOnInit(): void {

    this.gestionASignaturas.info_add()
      .subscribe(value => {
        this.departamentoSelect = value.departamentos
        this.titulacionSelect = value.titulaciones
        this.usuarioSelect = value.profesores
      })


    this.route.queryParams
      .subscribe(params => {
        this.gestionASignaturas.show(this.route.snapshot.paramMap.get('id')!)
          .subscribe(value => {
            this.asignatura = value;
            this.asignaturaForm.get("nombre")?.setValue(this.asignatura.nombre);
            this.asignaturaForm.get("contenido")?.setValue(this.asignatura.contenido);
            this.asignaturaForm.get("creditos")?.setValue(this.asignatura.creditos);
            this.asignaturaForm.get("codigo")?.setValue(this.asignatura.codigo);
            this.asignaturaForm.get("tipo")?.setValue(this.asignatura.tipo);
            this.asignaturaForm.get("horas")?.setValue(this.asignatura.horas);
            this.asignaturaForm.get("anhoacademico")?.setValue(this.asignatura.anhoacademico);
            this.asignaturaForm.get("cuatrimestre")?.setValue(this.asignatura.cuatrimestre);
            this.asignaturaForm.get("departamento")?.setValue(this.asignatura.departamento);
            this.asignaturaForm.get("titulacion")?.setValue(this.asignatura.titulacion);
            this.asignaturaForm.get("profesor")?.setValue(this.asignatura.profesor);
            this.anhoSelected = this.asignatura.anhoacademico;
          }
          )
      }
      );
  }


  onSubmit() {

    const nombre = this.asignaturaForm.get("nombre")?.value;
    const contenido = this.asignaturaForm.get("contenido")?.value;
    const creditos = this.asignaturaForm.get("creditos")?.value;
    const tipo = this.asignaturaForm.get("tipo")?.value;
    const horas = this.asignaturaForm.get("horas")?.value;
    const cuatrimestre = this.asignaturaForm.get("cuatrimestre")?.value;
    const titulacion = this.asignaturaForm.get("titulacion")?.value;
    const anhoacademico = this.anhoSelected;
    const departamento = this.asignaturaForm.get("departamento")?.value;
    const codigo = this.asignaturaForm.get("codigo")?.value;
    const profesor = this.asignaturaForm.get("profesor")?.value;

    const titulacionCompleta = this.titulacionSelect?.find(value => value.id = titulacion);


    this.gestionASignaturas.editAsignatura(this.asignatura!.id, nombre, creditos, contenido, tipo, horas, cuatrimestre, titulacion, titulacionCompleta!.anho_id, departamento, profesor, codigo)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-asignaturas/showall'], { queryParams: { flashok: this.ts.instant("gestion-asignaturas.edit-ok") } });
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-asignaturas.add-error-duplicado');
              break;
            case '4001':
              this.error = this.ts.instant('gestion-asignaturas.add-error-integridad');
              break;
            case '4004':
              this.error = this.ts.instant('gestion-asignaturas.add-error-integridad');
              break;
            default:
              this.error = this.ts.instant('gestion-asignaturas.edit-error');
              break;
          }
        }
      )

  }

}
