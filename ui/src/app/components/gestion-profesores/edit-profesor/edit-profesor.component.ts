import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/Gestion-usuario/Usuario';
import { Departamento } from 'src/app/models/Gestion-departamentos/Departamento';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionProfesoresService } from '../../../services/gestion-profesores.service';
import { TranslateService } from '@ngx-translate/core';
import { Profesor } from 'src/app/models/Gestion-Profesores/Profesor';

@Component({
  selector: 'app-edit-profesor',
  templateUrl: './edit-profesor.component.html',
  styleUrls: ['./edit-profesor.component.css'],
})
export class EditProfesorComponent implements OnInit {
  public readonly profesorForm: FormGroup;
  public departamentoSelect?: Array<Departamento>;
  public error?: string;
  profesor?: Profesor;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionProfesoresService: GestionProfesoresService,
    public ts: TranslateService
  ) {
    this.profesorForm = new FormGroup({
      dni: new FormControl('', [Validators.required]),

      departamento: new FormControl('', [Validators.required]),

      dedicacion: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {    this.gestionProfesoresService.info_add().subscribe(value => {
    this.departamentoSelect = value.departamentos;
  });


  this.route.queryParams
    .subscribe(params => {
        console.log(this.route.snapshot.paramMap.get('dni'));
        this.gestionProfesoresService.show(this.route.snapshot.paramMap.get('dni')!)
          .subscribe(prf => {
              this.profesor = prf;
              this.profesorForm.get("dni")?.setValue(this.profesor.dni);
              this.profesorForm.get("departamento")?.setValue(this.profesor.departamento);
              this.profesorForm.get("dedicacion")?.setValue(this.profesor.dedicacion);
            }
          )
      }
    );}

  onSubmit(){
    const dni = this.profesorForm.get("dni")?.value;
    const departamento = this.profesorForm.get("departamento")?.value;
    const dedicacion = this.profesorForm.get("dedicacion")?.value;

    this.gestionProfesoresService.editProfesores(dni, departamento, dedicacion)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-profesores/showall']);
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-profesores.edit-error-duplicado');
              break;
            default:
              this.error = this.ts.instant('gestion-profesores.edit-error');
              break;
          }
        }
      )

  }
}
