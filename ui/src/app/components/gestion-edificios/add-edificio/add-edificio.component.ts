import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionEdificiosService } from '../../../services/gestion-edificios.service';
import { TranslateService } from '@ngx-translate/core';
import { Universidad } from 'src/app/models/Gestion-Universidades/Universidad';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edificio',
  templateUrl: './add-edificio.component.html',
  styleUrls: ['./add-edificio.component.css'],
})
export class AddEdificioComponent implements OnInit {
  public readonly edificioForm: FormGroup;
  public universidadSelect?: Array<Universidad>;
  public error?: string;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionEdificiosService: GestionEdificiosService,
    public ts: TranslateService
  ) {
    this.edificioForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,60}$'),
      ]),

      ubicacion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,100}$'),
      ]),

      universidad: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {  this.gestionEdificiosService.info_add().subscribe(value => this.universidadSelect = value.universidades)}

  onSubmit(){
    const nombre = this.edificioForm.get("nombre")?.value;
    const ubicacion = this.edificioForm.get("ubicacion")?.value;
    const universidad = this.edificioForm.get("universidad")?.value;

    this.gestionEdificiosService.addEdificio(nombre, ubicacion, universidad)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-edificios/showall']);
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-edificios.add-error-duplicado');
              break;
            default:
              this.error = this.ts.instant('gestion-edificios.add-error');
              break;
          }
        }
      )

  }
}
