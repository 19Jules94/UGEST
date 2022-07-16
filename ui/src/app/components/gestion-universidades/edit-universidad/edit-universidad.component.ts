import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Universidad } from 'src/app/models/Gestion-Universidades/Universidad';
import { Usuario } from 'src/app/models/Gestion-usuario/Usuario';
import { GestionUniversidadesService } from 'src/app/services/gestion-universidades.service';
@Component({
  selector: 'app-edit-universidad',
  templateUrl: './edit-universidad.component.html',
  styleUrls: ['./edit-universidad.component.css']
})
export class EditUniversidadComponent implements OnInit {

  public readonly universidadForm: FormGroup; 
  public responsableSelect?: Array<Usuario>;
  public error?: string;
  universidad?: Universidad;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionUniversidadesService: GestionUniversidadesService,  
    public ts: TranslateService
  ) {
    this.universidadForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,60}$'),
      ]),

      ciudad: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
        Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,50}$")
      ]),

      responsable: new FormControl('', [
        Validators.required
      ])      
    }
    );
  }

  ngOnInit(): void {   this.info_add();

    this.route.queryParams
      .subscribe(params => {
          this.gestionUniversidadesService.show(this.route.snapshot.paramMap.get('id')!)
            .subscribe(uni => {
                this.universidad = uni;
                this.universidadForm.get("nombre")?.setValue(this.universidad.nombre);
                this.universidadForm.get("ciudad")?.setValue(this.universidad.ciudad);
                this.universidadForm.get("responsable")?.setValue(this.universidad.responsable);

              }
            )
        }
      );
}

  onSubmit(){
    if (this.universidad) {
    const nombre = this.universidadForm.get("nombre")?.value;
    const ciudad = this.universidadForm.get("ciudad")?.value;
    const responsable = this.universidadForm.get("responsable")?.value;
    

    this.gestionUniversidadesService.editUniversidad(this.universidad.id, nombre, ciudad, responsable)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-universidades/showall']);
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-universidades.add-error-duplicado');
              break;
            default:
              this.error = this.ts.instant('gestion-universidades.add-error');
              break;
          }
        }
      )
    }

  }

  info_add(): void {
    this.gestionUniversidadesService.info_add().subscribe(
      value => {  
        this.responsableSelect = value.usuarios;
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
