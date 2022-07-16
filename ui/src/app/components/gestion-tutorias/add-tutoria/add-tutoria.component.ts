import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AAcademico } from 'src/app/models/Gestion-AAcademico/AAcademico';
import { Espacio } from 'src/app/models/Gestion-espacios/Espacio';
import { Profesor } from 'src/app/models/Gestion-Profesores/Profesor';
import { GestionTutoriasService } from 'src/app/services/gestion-tutorias.service';

@Component({
  selector: 'app-add-tutoria',
  templateUrl: './add-tutoria.component.html',
  styleUrls: ['./add-tutoria.component.css']
})
export class AddTutoriaComponent implements OnInit {

  public readonly tutoriaForm: FormGroup;
  public profesorSelect?: Array<Profesor>;
  public anhoSelect?: Array<AAcademico>;
  public espaciosSelect?: Array<Espacio>;
  public defaultDate?: Date;
  public error?: string;


  isShown: boolean = false ; // hidden by default
  d_inicio:number=0
  d_fin:number=0
  semana_siguiente:number=0;


  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly gestionTutoriasService: GestionTutoriasService,
              public ts: TranslateService) {


    this.tutoriaForm = new FormGroup({

        anho: new FormControl('', [
          Validators.required
        ]),

        profesor: new FormControl('', [
          Validators.required
        ]),

        espacio: new FormControl('', [
          Validators.required
        ]),

        asistencia: new FormControl('', [
          Validators.required
        ]),

        fecha: new FormControl('', [
          Validators.required
        ]),

        hora_inicio: new FormControl('', [
          Validators.required
        ]),

        hora_fin: new FormControl('', [
          Validators.required
        ]),
        fecha_fin: new FormControl('', [
          Validators.required
        ])
      }
    )
  }


  ngOnInit(): void {
    this.gestionTutoriasService.info_add().subscribe(
      value => {
          this.anhoSelect = value.anho_academicos,
          this.profesorSelect = value.profesores,
          this.espaciosSelect = value.espacios
      }
    )
  }

  onSubmit() {
    const anho = this.tutoriaForm.get("anho")?.value;
    const profesor = this.tutoriaForm.get("profesor")?.value;
    const espacio = this.tutoriaForm.get("espacio")?.value;
    const asistencia = this.tutoriaForm.get("asistencia")?.value;
    var fecha = this.tutoriaForm.get("fecha")?.value;
    const hora_inicio = this.tutoriaForm.get("hora_inicio")?.value + ':00';
    const hora_fin = this.tutoriaForm.get("hora_fin")?.value + ':00';
    var fecha_fin = this.tutoriaForm.get("fecha_fin")?.value;


    this.d_inicio=parseInt(fecha.split("-")[2])
    this.d_fin=parseInt(fecha_fin.split("-")[2])



 
   var numero_dias=this.d_fin-this.d_inicio;
    console.log(numero_dias)

    if(numero_dias==0){
      console.log("entra a false")
    this.gestionTutoriasService.addTutoria(anho, profesor, espacio, asistencia, fecha, hora_inicio, hora_fin)
      .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-tutorias/showall'], {queryParams: {flashok: this.ts.instant("gestion-tutorias.add-ok")}});
        },
        error => {

          switch (error.message) {
            case '40011':
              this.error = this.ts.instant('gestion-tutorias.add-error-esp-ocupado');
              break;
            case '40013':
              this.error = this.ts.instant('gestion-tutorias.add-error-pro-ocupado');
              break;
            case '4002':
              this.error = this.ts.instant('gestion-tutorias.add-error-duplicado');
              break;
            case '4004':
              this.error = this.ts.instant('gestion-tutorias.add-error-integridad');
              break;
            default:
              this.error = this.ts.instant('gestion-tutorias.add-error');
              break;
          }
        }
      )
      }
      if(numero_dias>0){
        console.log("entra a true")
        
        
       while(this.d_inicio<=this.d_fin){
        this.gestionTutoriasService.addTutoria(anho, profesor, espacio, asistencia, fecha, hora_inicio, hora_fin)
      .subscribe(
        value => {
          //this.router.navigate(['/panel-principal/gestion-tutorias/showall'], {queryParams: {flashok: this.ts.instant("gestion-tutorias.add-ok")}});
        },
        error => {

          switch (error.message) {
            case '40011':
              this.error = this.ts.instant('gestion-tutorias.add-error-esp-ocupado');
              break;
            case '40013':
              this.error = this.ts.instant('gestion-tutorias.add-error-pro-ocupado');
              break;
            case '4002':
              this.error = this.ts.instant('gestion-tutorias.add-error-duplicado');
              break;
            case '4004':
              this.error = this.ts.instant('gestion-tutorias.add-error-integridad');
              break;
            default:
              this.error = this.ts.instant('gestion-tutorias.add-error');
              break;
          }
        }
      )
      if(this.comprobarFindeSemana(fecha=new Date(fecha),fecha_fin=new Date(fecha_fin))==true && numero_dias<=5){
      this.d_inicio=this.d_inicio+1;
      fecha=this.formatDate(this.sumarDias( fecha=new Date(fecha),1));
      }else{
        this.d_inicio=this.d_inicio+numero_dias;
        fecha=this.formatDate(this.sumarDias( fecha=new Date(fecha),numero_dias));
      }
         
          
    

    }
    this.router.navigate(['/panel-principal/gestion-tutorias/showall']);
  }
  }

    public sumarDias(fecha:Date, dias:number){
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    }
    public comprobarFindeSemana(finicio:Date,ffinal:Date){
      if(finicio.getDay() == 0 || finicio.getDay()==6 ||ffinal.getDay() ==0 || ffinal.getDay()==6){
        console.log("finicio",finicio.getDay());
        console.log("ffinal",ffinal.getDay());
        return false;
      }else{
        console.log("finicio",finicio.getDay());
                console.log("ffinal",ffinal.getDay());
        return true;
      }
    }
    public formatDate(fecha:Date){
      var year =fecha.getFullYear().toString();
      var month =(fecha.getMonth()+1).toString();
     
      var day = fecha.getDate().toString();
    
      var fecha_final=year+'-'+0+month+'-'+day;
    
      return fecha_final;
    
    
    }
}
