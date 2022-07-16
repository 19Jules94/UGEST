import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Universidad } from 'src/app/models/Gestion-Universidades/Universidad';
import { Departamento } from 'src/app/models/Gestion-departamentos/Departamento';
import { Usuario } from 'src/app/models/Gestion-usuario/Usuario';
import {ActivatedRoute, Router} from "@angular/router";
import {GestionEdificiosService} from "../../../services/gestion-edificios.service";
import {TranslateService} from "@ngx-translate/core";
import {GestionProfesoresService} from "../../../services/gestion-profesores.service";

@Component({
  selector: 'app-add-profesor',
  templateUrl: './add-profesor.component.html',
  styleUrls: ['./add-profesor.component.css']
})
export class AddProfesorComponent implements OnInit {
  public readonly profesorForm: FormGroup;
  public usuarioSelect?: Array<Usuario>;
  public departamentoSelect?: Array<Departamento>;
  public error?: string;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gestionProfesoresService: GestionProfesoresService,
    public ts: TranslateService) {

this.profesorForm = new FormGroup({

dni: new FormControl('', [
Validators.required
]),

departamento: new FormControl('', [
Validators.required
]),

dedicacion: new FormControl('', [
Validators.required
]),
}
)

}

  ngOnInit(): void {
    this.gestionProfesoresService.info_add().subscribe(value => {
      this.usuarioSelect = value.usuarios;
      this.departamentoSelect = value.departamentos;
  })

}
onSubmit(){
  const dni = this.profesorForm.get("dni")?.value;
  const departamento = this.profesorForm.get("departamento")?.value;
  const dedicacion = this.profesorForm.get("dedicacion")?.value;

  this.gestionProfesoresService.addProfesor(dni, departamento, dedicacion)
    .subscribe(
      value => {
        this.router.navigate(['/panel-principal/gestion-profesores/showall']);
      },
      error => {

        switch (error.message) {
          case '4002':
            this.error = this.ts.instant('gestion-profesores.add-error-duplicado');
            break;
          default:
            this.error = this.ts.instant('gestion-profesores.add-error');
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
