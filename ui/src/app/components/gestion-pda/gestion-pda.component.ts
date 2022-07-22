import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GestionPDAServiceService } from 'src/app/services/gestion-pdaservice.service';

@Component({
  selector: 'app-gestion-pda',
  templateUrl: './gestion-pda.component.html',
  styleUrls: ['./gestion-pda.component.css']
})
export class GestionPDAComponent implements OnInit {

  public readonly pdaForm: FormGroup;

  public error?: string;

  constructor(private readonly gestionPdaService: GestionPDAServiceService,
              public ts: TranslateService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {

    this.pdaForm = new FormGroup({
      file: new FormControl('', [
        Validators.required
      ]),
      fileSource: new FormControl('', [Validators.required])
    });

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.pdaForm.patchValue({
        fileSource: file
      });
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {

    const file = this.pdaForm.get("fileSource")?.value;

    this.gestionPdaService.upload(file)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal'], {queryParams: {flashok: this.ts.instant("gestion-pda.ok")}});
        },
        error => {
          this.error = this.ts.instant('gestion-pda.error');
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
