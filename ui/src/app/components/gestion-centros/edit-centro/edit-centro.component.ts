import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Centro } from 'src/app/models/Gestion-centros/Centro';
import { Universidad } from 'src/app/models/Gestion-Universidades/Universidad';
import { Usuario } from 'src/app/models/Gestion-usuario/Usuario';
import { GestionCentrosService } from 'src/app/services/gestion-centros.service';
import { GestionUniversidadesService } from 'src/app/services/gestion-universidades.service';

@Component({
  selector: 'app-edit-centro',
  templateUrl: './edit-centro.component.html',
  styleUrls: ['./edit-centro.component.css']
})
export class EditCentroComponent implements OnInit {

  public readonly centroForm: FormGroup;
  public responsableSelect?: Array<Usuario>;
  public universidadSelect?: Array<Universidad>;
  public error?: string;
  public centro?: Centro;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionCentrosService: GestionCentrosService,
    private readonly gestionUniversidadesService: GestionUniversidadesService,
    public ts: TranslateService
  ) {
    this.centroForm = new FormGroup({
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
      ]),
      universidad: new FormControl('', [
        Validators.required
      ])
    }
    );
  }

  ngOnInit(): void {  this.info_add();
    this.route.queryParams
      .subscribe(params => {
           this.gestionCentrosService.show(this.route.snapshot.paramMap.get('id')!)
            .subscribe(centro => {
                this.centro = centro; 
                this.centroForm.get("nombre")?.setValue(this.centro.nombre);
                this.centroForm.get("ciudad")?.setValue(this.centro.ciudad);
                this.centroForm.get("responsable")?.setValue(this.centro.responsable);
                this.centroForm.get("universidad")?.setValue(this.centro.universidad_id);
              }
            )
        }
      );
  }
  onSubmit() {
    const id = this.centro?.id;
    const nombre = this.centroForm.get("nombre")?.value;
    const ciudad = this.centroForm.get("ciudad")?.value;
    const responsable = this.centroForm.get("responsable")?.value;
    const universidad = this.centroForm.get("universidad")?.value;

    this.gestionCentrosService.editCentro(id!, nombre, ciudad, responsable, universidad)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-centros/showall'], { queryParams: { flashok: this.ts.instant("gestion-centros.edit-ok") } });
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-centros.add-error-duplicado');
              break;
            default:
              this.error = this.ts.instant('gestion-centros.edit-error');
              break;
          }
        }
      )

  } 

  info_add(): void {
    this.gestionCentrosService.info_add().subscribe(
      value => {   
        this.universidadSelect = value.universidades;
       }
    )
    
    this.gestionUniversidadesService.info_add().subscribe(
      value => {  
        console.log(value);
        this.responsableSelect = value.usuarios;
      }
    )
}
}
