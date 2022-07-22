import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Departamento } from 'src/app/models/Gestion-departamentos/Departamento';
import { Profesor } from 'src/app/models/Gestion-Profesores/Profesor';
import { Titulacion } from 'src/app/models/Gestion-titulaciones/Titulacion';
import { GestionAsignaturasService } from 'src/app/services/gestion-asignaturas.service';

@Component({
  selector: 'app-add-asignaturas',
  templateUrl: './add-asignaturas.component.html',
  styleUrls: ['./add-asignaturas.component.css']
})
export class AddAsignaturasComponent implements OnInit {

  public readonly asignaturaForm: FormGroup;

  error?:string;
  titulacionSelect? : Array<Titulacion>;
  departamentoSelect? : Array<Departamento>;
  usuarioSelect? : Array<Profesor>;
  anhoSelected?: string;

  constructor(private readonly router: Router,
    public gestionASignaturasService : GestionAsignaturasService,
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
    this.gestionASignaturasService.info_add()
    .subscribe(value =>
      {
        this.departamentoSelect = value.departamentos
        this.titulacionSelect = value.titulaciones
      this.usuarioSelect=value.profesores })

  }


  onSubmit(){


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
    console.log(titulacionCompleta)
    this.gestionASignaturasService.addAsignatura(nombre, creditos,contenido,tipo,horas,cuatrimestre,titulacion,titulacionCompleta!.anho_id, departamento, codigo,profesor)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-asignaturas/showall'], {queryParams: {flashok: this.ts.instant("gestion-asignaturas.add-ok")}});
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-asignaturas.add-error-duplicado');
              break;
            default:
              this.error = this.ts.instant('gestion-asignaturas.add-error');
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
