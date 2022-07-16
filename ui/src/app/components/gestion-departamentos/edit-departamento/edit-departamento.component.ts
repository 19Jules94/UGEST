import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Centro } from 'src/app/models/Gestion-centros/Centro';
import { Departamento } from 'src/app/models/Gestion-departamentos/Departamento';

import { GestionDepartamentosService } from 'src/app/services/gestion-departamentos.service';
@Component({
  selector: 'app-edit-departamento',
  templateUrl: './edit-departamento.component.html',
  styleUrls: ['./edit-departamento.component.css']
})
export class EditDepartamentoComponent implements OnInit {


  public readonly departamentoForm: FormGroup; 
  public centroSelect?: Array<Centro>;
  public error?: string;
  public departamento?: Departamento;
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

  ngOnInit(): void {    this.info_add();
    this.route.queryParams
      .subscribe(params => {
           this.gestionDepartamentos.show(this.route.snapshot.paramMap.get('id')!)
            .subscribe(departamento => {
                this.departamento = departamento;  
                this.departamentoForm.get("nombre")?.setValue(this.departamento.nombre);
                this.departamentoForm.get("codigo")?.setValue(this.departamento.codigo);
                this.departamentoForm.get("centro")?.setValue(this.departamento.id_centro); 
              }
            )
        }
      );;}

  onSubmit(){
    const id = this.departamento?.id;
    const nombre = this.departamentoForm.get("nombre")?.value;
    const codigo = this.departamentoForm.get("codigo")?.value;
    const centro = this.departamentoForm.get("centro")?.value;
    

    this.gestionDepartamentos.editDepartamento(id!,nombre, codigo,centro)
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
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
    this.error = undefined;
  }
}
