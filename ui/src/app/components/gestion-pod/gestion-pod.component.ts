import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GestionPODServiceService } from 'src/app/services/gestion-podservice.service';

@Component({
  selector: 'app-gestion-pod',
  templateUrl: './gestion-pod.component.html',
  styleUrls: ['./gestion-pod.component.css']
})
export class GestionPODComponent implements OnInit {

  public readonly podForm: FormGroup;

  public error?: string;

  constructor(private readonly gestionPodService: GestionPODServiceService,
              public ts: TranslateService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {

    this.podForm = new FormGroup({
      file: new FormControl('', [
        Validators.required
      ]),
      fileSource: new FormControl('', [Validators.required])
    });

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.podForm.patchValue({
        fileSource: file
      });
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {

    const file = this.podForm.get("fileSource")?.value;

    this.gestionPodService.upload(file)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal'], {queryParams: {flashok: this.ts.instant("gestion-pod.ok")}});
        },
        error => {
          this.error = this.ts.instant('gestion-pod.error');
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
