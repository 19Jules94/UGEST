import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Anho } from 'src/app/models/Gestion-AAcademicos/Anho';
import { Centro } from 'src/app/models/Gestion-centros/Centro';
import { Usuario } from 'src/app/models/Gestion-usuario/Usuario';
import { GestionTitulacionesService } from 'src/app/services/gestion-titulaciones.service';

@Component({
  selector: 'app-add-titulaciones',
  templateUrl: './add-titulaciones.component.html',
  styleUrls: ['./add-titulaciones.component.css']
})
export class AddTitulacionesComponent implements OnInit {

  public readonly titulacionForm: FormGroup;
  public centroSelect?: Array<Centro>;
  public responsableSelect?: Array<Usuario>;
  public anhoSelect?: Array<Anho>;
  public error?: string;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionTitulaciones: GestionTitulacionesService,
    public ts: TranslateService) {

    this.titulacionForm = new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,60}$")
      ]),

      codigo: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}[0-9]{2}$")
      ]),

      centro: new FormControl('', [
        Validators.required
      ]),

      responsable: new FormControl('', [
        Validators.required
      ]),
 
      anhoacademico: new FormControl('', [
        Validators.required
      ]),
    }
    )
  }

  ngOnInit(): void {
    this.gestionTitulaciones.info_add()
    .subscribe(value => 
      { 
        this.centroSelect = value.centros
      this.responsableSelect=value.profesores
      this.anhoSelect=value.anhos })

  }

  onSubmit(){
    const nombre = this.titulacionForm.get("nombre")?.value;
    const codigo = this.titulacionForm.get("codigo")?.value;
    const centro = this.titulacionForm.get("centro")?.value;
    const responsable = this.titulacionForm.get("responsable")?.value;
    const anho = this.titulacionForm.get("anhoacademico")?.value;
 
    this.gestionTitulaciones.addTitulacion(nombre, codigo, responsable, centro,anho)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-titulaciones/showall'], {queryParams: {flashok: this.ts.instant("gestion-titulaciones.add-ok")}});
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-titulaciones.add-error-duplicado');
              break;

              case '4004':
                this.error = this.ts.instant('gestion-titulaciones.add-error-integridad');
                break;
            default:
              this.error = this.ts.instant('gestion-titulaciones.add-error');
              break;
          }
        }
      )

  }
}
