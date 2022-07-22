import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Asignatura } from 'src/app/models/Gestion-asignaturas/Asignatura';
import { Centro } from 'src/app/models/Gestion-centros/Centro';
import { Espacio } from 'src/app/models/Gestion-espacios/Espacio';
import { Grupo } from 'src/app/models/Gestion-grupos/Grupo';
import { Profesor } from 'src/app/models/Gestion-Profesores/Profesor';
import { Titulacion } from 'src/app/models/Gestion-titulaciones/Titulacion';
import { GestionHorariosService } from 'src/app/services/gestion-horarios.service';

@Component({
  selector: 'app-add-horario',
  templateUrl: './add-horario.component.html',
  styleUrls: ['./add-horario.component.css']
})
export class AddHorarioComponent implements OnInit {

  @Input() hora_inicio_value: Time = {hours: 0, minutes: 0};

  dias_semana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

  public readonly horarioForm: FormGroup;
  public asignaturaSelect?: Array<Asignatura>;
  public grupoSelect?: Array<Grupo>;
  public espacioSelect?: Array<Espacio>;
  public titulacionSelect?: Array<Titulacion>;
  public profesorSelect?: Array<Profesor>;
  public ogTitulaciones?: Array<Titulacion>;
  public ogAsignaturas?: Array<Asignatura>;
  public ogGrupos?: Array<Grupo>;
  public ogEspacios?: Array<Espacio>;
  public error?: string;
  public centros?: Array<Centro>;
  isShown: boolean = false ; // hidden by default
  d_inicio:number=0
  d_fin:number=0
  semana_siguiente:number=0;
  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly gestionHorarios: GestionHorariosService,
              public ts: TranslateService) {


    this.horarioForm = new FormGroup({
        asignatura: new FormControl('', [
          Validators.required
        ]),


        grupo: new FormControl('', [
          Validators.required
        ]),

        fecha: new FormControl('', [
          Validators.required
        ]),

        profesor: new FormControl('', [
          Validators.required
        ]),

        espacio: new FormControl('', [
          Validators.required
        ]),

        hora_inicio: new FormControl('', [
          Validators.required
        ]),

        hora_fin: new FormControl('', [
          Validators.required
        ]),


        titulacion: new FormControl('', [
          Validators.required
        ]),
        fecha_fin: new FormControl('', [
          Validators.required
        ])
      }
    )
  }

  ngOnInit(): void {

    this.gestionHorarios.info_add()
      .subscribe(value => {
        this.titulacionSelect = value.titulaciones;
        this.asignaturaSelect = value.asignaturas;
        this.grupoSelect = value.grupos;
        this.espacioSelect = value.espacios;
        this.profesorSelect = value.profesores;
        this.ogAsignaturas = value.asignaturas;
        this.ogTitulaciones = value.titulaciones;
        this.centros = value.centros;
        this.ogGrupos = value.grupos;
        this.ogEspacios = value.espacios;
        this.horarioForm.get("asignatura")?.disable();
        this.horarioForm.get("grupo")?.disable();
      })

  }

  getAsignaturas(id: String) {

    var tempTitulacion = this.titulacionSelect?.find(titulacion => titulacion.id == id);

    var uni_id = this.centros?.find(centros => centros.id == tempTitulacion?.centro_id)?.universidad_id;

    console.log(this.centros);
    console.log(tempTitulacion?.centro_id);

    this.espacioSelect = this.ogEspacios;
    this.espacioSelect = this.espacioSelect?.filter(espacios => espacios.edificio_universidad == uni_id)


    this.asignaturaSelect = this.ogAsignaturas;
    this.asignaturaSelect = this.asignaturaSelect?.filter(asignaturas => asignaturas.titulacion == tempTitulacion?.id)

    this.horarioForm.get("asignatura")?.enable();

  }

  getGrupos(id: String) {
    this.grupoSelect = this.ogGrupos;
    this.grupoSelect = this.grupoSelect?.filter(grupos => grupos.asignatura == id)
    this.horarioForm.get("grupo")?.enable();
  }

  onSubmit() {
  
    const grupo = this.horarioForm.get("grupo")?.value;
    const espacio = this.horarioForm.get("espacio")?.value;
    const profesor = this.horarioForm.get("profesor")?.value;
    const asignatura = this.horarioForm.get("asignatura")?.value;
    const titulacion = this.horarioForm.get("titulacion")?.value;
    var fecha = this.horarioForm.get("fecha")?.value;
    const hora_inicio = this.horarioForm.get("hora_inicio")?.value + ':00';
    const hora_fin = this.horarioForm.get("hora_fin")?.value + ':00';
    const asistencia = this.horarioForm.get("asistencia")?.value;
    const dia = this.dias_semana[new Date(this.horarioForm.get("fecha")?.value).getDay()]
    const titulacionCompleta = this.titulacionSelect?.find(value => value.id = titulacion);
    var fecha_fin = this.horarioForm.get("fecha_fin")?.value;

    
    this.d_inicio=parseInt(fecha.split("-")[2])
    this.d_fin=parseInt(fecha_fin.split("-")[2])



 
   var numero_dias=this.d_fin-this.d_inicio;
    console.log(numero_dias);
    
    if(numero_dias==0){
      this.gestionHorarios.addHorario(titulacion, titulacionCompleta!.anho_id, asignatura, grupo, profesor,
        espacio, "Pendiente", hora_inicio, hora_fin, dia, fecha)
        .subscribe(
        value => {
          this.router.navigate(['/panel-principal/gestion-horarios/showall']);
        },
        error => {

          switch (error.message) {
            case '40011':
              this.error = this.ts.instant('gestion-horarios.add-error-esp-ocupado');
              break;

            case '40012':
              this.error = this.ts.instant('gestion-horarios.add-error-gru-ocupado');
              break;

            case '40013':
              this.error = this.ts.instant('gestion-horarios.add-error-pro-ocupado');
              break;

            case '4002':
              this.error = this.ts.instant('gestion-horarios.add-error-duplicado');
              break;

            case '4004':
              this.error = this.ts.instant('gestion-horarios.add-error-integridad');
              break;
            default:
              this.error = this.ts.instant('gestion-horarios.add-error');
              break;
          }
        }
      )
    }
    if(numero_dias>0){
     
console.log("entra >0")
       
       while(this.d_inicio<=this.d_fin&& this.d_fin <= 31){
        console.log("d_inicio "+this.d_inicio);
        console.log("fecha "+fecha)
        
        this.gestionHorarios.addHorario(titulacion, titulacionCompleta!.anho_id, asignatura, grupo, profesor,
          espacio, "Pendiente", hora_inicio, hora_fin, dia, fecha)
          .subscribe(
            value => {
              //this.router.navigate(['/panel-principal/gestion-horarios/showall'], {queryParams: {flashok: this.ts.instant("gestion-horarios.add-ok")}});
              console.log("ok");
              
            },
            error => {
    
              switch (error.message) {
                case '40011':
                  this.error = this.ts.instant('gestion-horarios.add-error-esp-ocupado');
                  break;
    
                case '40012':
                  this.error = this.ts.instant('gestion-horarios.add-error-gru-ocupado');
                  break;
    
                case '40013':
                  this.error = this.ts.instant('gestion-horarios.add-error-pro-ocupado');
                  break;
    
                case '4002':
                  this.error = this.ts.instant('gestion-horarios.add-error-duplicado');
                  break;
    
                case '4004':
                  this.error = this.ts.instant('gestion-horarios.add-error-integridad');
                  break;
                default:
                  this.error = this.ts.instant('gestion-horarios.add-error');
                  break;
              }
            }
          )
          if (
            this.comprobarFindeSemana(
              (fecha = new Date(fecha)),
              (fecha_fin = new Date(fecha_fin))
            ) == true &&
            numero_dias <= 5
          ) {
            this.d_inicio = this.d_inicio + 1;
            fecha = this.formatDate(this.sumarDias((fecha = new Date(fecha)), 1));
          } else if (
            this.comprobarFindeSemana(
              (fecha = new Date(fecha)),
              (fecha_fin = new Date(fecha_fin))
            ) == true &&
            numero_dias % 7 == 0) {
            this.d_inicio = this.d_inicio + 7;
            console.log(this.d_inicio)
            fecha = this.formatDate(this.sumarDias((fecha = new Date(fecha)), 7));
            console.log("fFF", fecha)
          }
        }
  
        
      
        this.router.navigate(['/panel-principal/gestion-horarios/showall']);
      }
    }
  
    public sumarDias(fecha: Date, dias: number) {
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    }
    public comprobarFindeSemana(finicio: Date, ffinal: Date) {
      if (
        finicio.getDay() == 0 ||
        finicio.getDay() == 6 ||
        ffinal.getDay() == 0 ||
        ffinal.getDay() == 6
      ) {
        console.log('finicio', finicio.getDay());
        console.log('ffinal', ffinal.getDay());
        return false;
      } else {
        console.log('finicio', finicio.getDay());
        console.log('ffinal', ffinal.getDay());
        return true;
      }
    }
    public formatDate(fecha: Date) {
      var year = fecha.getFullYear().toString();
      var month = (fecha.getMonth() + 1).toString();
  
      var day = fecha.getDate().toString();
  
      if (parseInt(day) < 10) {
        var fecha_final = year + '-' + 0 + month + '-' + 0 + day;
      } else {
        var fecha_final = year + '-' + 0 + month + '-' + day;
      }
      return fecha_final;
    }
  
  onChange($event: Event) {
    this.getAsignaturas(this.horarioForm.get("titulacion")?.value);
  }

  onChangeAsignatura($event: Event) {
    this.getGrupos(this.horarioForm.get("asignatura")?.value);
  }
  getflashError() {
    return this.error;
  }

  onCloseFlash() {
    this.error = undefined;
  }

}
