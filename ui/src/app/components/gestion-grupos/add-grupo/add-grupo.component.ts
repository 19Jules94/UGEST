import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Asignatura } from 'src/app/models/Gestion-asignaturas/Asignatura';
import { Titulacion } from 'src/app/models/Gestion-titulaciones/Titulacion';
import { GestionGruposService } from 'src/app/services/gestion-grupos.service';

@Component({
  selector: 'app-add-grupo',
  templateUrl: './add-grupo.component.html',
  styleUrls: ['./add-grupo.component.css']
})
export class AddGrupoComponent implements OnInit {

  public readonly grupoForm: FormGroup;
  public asignaturaSelect?: Array<Asignatura>;
  public titulacionSelect?: Array<Titulacion>;
  public error?: string;
  public ogAsignaturas?: Array<Asignatura>;
  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionGrupos: GestionGruposService,
    public ts: TranslateService) {

    this.grupoForm = new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,60}$")
      ]),

      codigo: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Z]{1}[0-9]{2}[a-z]{1}[0-9]{2}$")
      ]),

      asignatura: new FormControl('', [
        Validators.required
      ]),

      tipo: new FormControl('', [
        Validators.required
      ]),

      horas: new FormControl('', [
        Validators.required
      ]),

      titulacion: new FormControl('', [
        Validators.required
      ])
    }
    )
  }

  ngOnInit(): void {
    this.gestionGrupos.info_add()
      .subscribe(value => {
        this.titulacionSelect = value.titulaciones
        this.asignaturaSelect = value.asignaturas
        this.ogAsignaturas = value.asignaturas
        this.grupoForm.get("asignatura");
      })
  }


  getAsignaturas(titulacion: Titulacion) {
    this.asignaturaSelect=this.ogAsignaturas;
    this.asignaturaSelect = this.asignaturaSelect?.filter(asignaturas => asignaturas.titulacion == titulacion.id)  
    this.grupoForm.get("asignatura"); 

   }

  onSubmit() {
    const nombre = this.grupoForm.get("nombre")?.value;
    const codigo = this.grupoForm.get("codigo")?.value;
    const tipo = this.grupoForm.get("tipo")?.value;
    const horas = this.grupoForm.get("horas")?.value;
    const titulacion = this.grupoForm.get("titulacion")?.value;
    const asignatura = this.grupoForm.get("asignatura")?.value; 

    const titulacionCompleta = this.titulacionSelect?.find(value => value.id = titulacion);



    this.gestionGrupos.addGrupo(nombre, codigo, tipo, horas,titulacionCompleta!.anho_id, titulacion, asignatura)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-grupos/showall']);
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-grupos.add-error-duplicado');
              break;

              case '4004':
                this.error = this.ts.instant('gestion-grupos.add-error-integridad');
                break;
            default:
              this.error = this.ts.instant('gestion-grupos.add-error');
              break;
          }
        }
      )

  }


}
