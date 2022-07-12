import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Universidad } from 'src/app/models/Gestion-Universidades/Universidad';
import { Usuario } from 'src/app/models/Gestion-usuario/Usuario';
import { GestionCentrosService } from 'src/app/services/gestion-centros.service';
import { GestionUniversidadesService } from 'src/app/services/gestion-universidades.service';

@Component({
  selector: 'app-add-centro',
  templateUrl: './add-centro.component.html',
  styleUrls: ['./add-centro.component.css']
})
export class AddCentroComponent implements OnInit {

  public readonly centroForm: FormGroup;
  public universidadSelect?: Array<Universidad>;
  public responsableSelect?: Array<Usuario>;
  public error?: string;
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

  ngOnInit(): void {  this.info_add();}

  onSubmit(){
    const nombre = this.centroForm.get("nombre")?.value;
    const ciudad = this.centroForm.get("ciudad")?.value;
    const responsable = this.centroForm.get("responsable")?.value;
    const universidad = this.centroForm.get("universidad")?.value;

    this.gestionCentrosService.addCentro(nombre, ciudad,responsable, universidad)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-centros/showall']);
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-centros.add-error-duplicado');
              break;
            default:
              this.error = this.ts.instant('gestion-centros.add-error');
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

    this.gestionCentrosService.info_add().subscribe(
      value => {   
        this.universidadSelect = value.universidades;
      }
    )
  }

}
