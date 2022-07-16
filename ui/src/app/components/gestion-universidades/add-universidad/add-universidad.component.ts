import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Usuario } from 'src/app/models/Gestion-usuario/Usuario';
import { GestionUniversidadesService } from 'src/app/services/gestion-universidades.service';

@Component({
  selector: 'app-add-universidad',
  templateUrl: './add-universidad.component.html',
  styleUrls: ['./add-universidad.component.css']
})
export class AddUniversidadComponent implements OnInit {

  public readonly universidadForm: FormGroup; 
  public responsableSelect?: Array<Usuario>;
  public error?: string;
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

  ngOnInit(): void {  this.info_add();}

  onSubmit(){
    const nombre = this.universidadForm.get("nombre")?.value;
    const ciudad = this.universidadForm.get("ciudad")?.value;
    const responsable = this.universidadForm.get("responsable")?.value;
    

    this.gestionUniversidadesService.addUniversidad(nombre, ciudad,responsable)
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
