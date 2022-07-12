import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Centro } from 'src/app/models/Gestion-centros/Centro';
import { GestionDepartamentosService } from 'src/app/services/gestion-departamentos.service';

@Component({
  selector: 'app-add-departamento',
  templateUrl: './add-departamento.component.html',
  styleUrls: ['./add-departamento.component.css']
})
export class AddDepartamentoComponent implements OnInit {


  public readonly departamentoForm: FormGroup; 
  public centroSelect?: Array<Centro>;
  public error?: string;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionDepartamentos: GestionDepartamentosService,  
    public ts: TranslateService
  ) {
    this.departamentoForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,60}$'),
      ]),

      codigo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
        Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,50}$")
      ]),

      centro: new FormControl('', [
        Validators.required
      ])      
    }
    );
  }

  ngOnInit(): void {  this.info_add();}

  onSubmit(){
    const nombre = this.departamentoForm.get("nombre")?.value;
    const codigo = this.departamentoForm.get("codigo")?.value;
    const centro = this.departamentoForm.get("centro")?.value;
    

    this.gestionDepartamentos.addDepartamento(nombre, codigo,centro)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-departamentos/showall']);
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-departamentos.add-error-duplicado');
              break;
            default:
              this.error = this.ts.instant('gestion-departamentos.add-error');
              break;
          }
        }
      )

  }

  info_add(): void {
    this.gestionDepartamentos.info_add().subscribe(
      value => {  
        this.centroSelect = value.centros;
      }
    )   
  }

}
