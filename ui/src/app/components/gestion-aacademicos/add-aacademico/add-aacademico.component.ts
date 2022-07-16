import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import { GestionAacademicoService } from 'src/app/services/gestion-aacademico.service'; 

@Component({
  selector: 'app-add-aacademico',
  templateUrl: './add-aacademico.component.html',
  styleUrls: ['./add-aacademico.component.css']
})
export class AddAAcademicoComponent implements OnInit {

  public readonly anhoForm: FormGroup;
  public error?: string;
  

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly gestionAAcademicoService: GestionAacademicoService,
              public ts: TranslateService) {
                

    this.anhoForm = new FormGroup({

        anho1: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern("^[0-9]{4}$")
        ]),

        anho2: new FormControl('', [])

      }
    )

    this.anhoForm.get('anho1')?.valueChanges.subscribe(() => {
      const anho2 = Number(this.anhoForm.get("anho1")?.value) + 1;
      this.anhoForm.get('anho2')?.setValue(anho2);
    });

              }

  ngOnInit(): void {
  }
  onSubmit() {
    const anho1 = this.anhoForm.get("anho1")?.value;
    const anho2 = this.anhoForm.get("anho2")?.value;

    const id = anho1 + "" + anho2;

    this.gestionAAcademicoService.addAAcademico(id)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-aacademico/showall'], {queryParams: {flashok: this.ts.instant("gestion-aacademico.add-ok")}});
        },
        error => {

          switch (error.message) {
            case '4002':
              this.error = this.ts.instant('gestion-aacademico.add-error-duplicado');
              break;
            default:
              this.error = this.ts.instant('gestion-aacademico.add-error');
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

