import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Anho } from 'src/app/models/Gestion-AAcademicos/Anho';
import { Centro } from 'src/app/models/Gestion-centros/Centro';
import { Titulacion } from 'src/app/models/Gestion-titulaciones/Titulacion';
import { Usuario } from 'src/app/models/Gestion-usuario/Usuario';
import { GestionTitulacionesService } from 'src/app/services/gestion-titulaciones.service';

@Component({
  selector: 'app-edit-titulaciones',
  templateUrl: './edit-titulaciones.component.html',
  styleUrls: ['./edit-titulaciones.component.css']
})
export class EditTitulacionesComponent implements OnInit {

  public readonly titulacionForm: FormGroup;
  public centroSelect?: Array<Centro>;
  public responsableSelect?: Array<Usuario>;
  public anhoSelect?: Array<Anho>;
  public error?: string;
  public titulacion?: Titulacion;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionTitulacionesService: GestionTitulacionesService,
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
    this.gestionTitulacionesService.info_add()
    .subscribe(value => 
      { 
        this.centroSelect = value.centros
        this.responsableSelect=value.profesores 
        this.anhoSelect=value.anhos 
       })
 
      this.route.queryParams
      .subscribe(params => {
           this.gestionTitulacionesService.show(this.route.snapshot.paramMap.get('id')!)
            .subscribe(tit => {
              this.titulacion = tit;
              this.titulacionForm.get("nombre")?.setValue(this.titulacion.nombre);
              this.titulacionForm.get("codigo")?.setValue(this.titulacion.codigo);
              this.titulacionForm.get("centro")?.setValue(this.titulacion.centro_id);
              this.titulacionForm.get("responsable")?.setValue(this.titulacion.responsable_dni);
               this.titulacionForm.get("anhoacademico")?.setValue(this.titulacion.anho_id);
              }
            )
        }
      ); 
  }

  onSubmit(){ 
    const nombre = this.titulacionForm.get("nombre")?.value;
    const codigo = this.titulacionForm.get("codigo")?.value;
    const centro = this.titulacionForm.get("centro")?.value;
    const responsable = this.titulacionForm.get("responsable")?.value;
    const anho = this.titulacionForm.get("anhoacademico")?.value;;

    this.gestionTitulacionesService.editTitulaciones(this.titulacion!.id, nombre, codigo, responsable, centro,anho)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-titulaciones/showall'], {queryParams: {flashok: this.ts.instant("gestion-titulaciones.edit-ok")}});
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-titulaciones.edit-error-duplicado');
              break;
            default:
              this.error = this.ts.instant('gestion-titulaciones.edit-error');
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
