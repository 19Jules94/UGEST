import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from "angular-calendar";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subject} from "rxjs";

import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeGl from '@angular/common/locales/gl';
import {endOfDay, isSameDay, isSameMonth, startOfDay,} from 'date-fns';


import {GestionTutoriasService} from "../../services/gestion-tutorias.service";
import { Tutoria } from 'src/app/models/Gestion-tutorias/Tutoria'; 
import { Horario } from 'src/app/models/Gestion-horarios/Horario'; 
import {GestionHorariosService} from "../../services/gestion-horarios.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

registerLocaleData(localeGl);
registerLocaleData(localeEs);

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  green: {
    primary: '#0B6730',
    secondary: '#e4f8d8',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  view: CalendarView = CalendarView.Month;

  tutorias: Array<Tutoria> = [];
  horarios: Array<Horario> = [];

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  actions_tutoria: CalendarEventAction[] = [
    {
      label: '<div class="text-white d-inline ml-4"><i class="far fa-check-square text-white mr-1"></i>Marcar Asistencia</div>',
      a11yLabel: 'Marcar asistencia',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('tutoria', event);
      }
    }
  ];

  actions_horario: CalendarEventAction[] = [
    {
      label: '<div class="text-white d-inline ml-4"><i class="far fa-check-square text-white mr-1"></i>Marcar Asistencia</div>',
      a11yLabel: 'Marcar asistencia',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('horario', event);
      }
    }
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal,
              private translate: TranslateService,
              private readonly gestionTutoriasService: GestionTutoriasService,
              private readonly gestionHorariosService: GestionHorariosService,
              private _modalService: NgbModal) {
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if (action == 'tutoria') {
      const modalRef = this._modalService.open(NgbdModalMarcarAsistencia);
      modalRef.componentInstance.tutoria = event.id;
      modalRef.componentInstance.entidad = 'tutoria';
      modalRef.componentInstance.text = event.title;
      modalRef.closed.subscribe(() => this.actualizarEventos());
    } else {
      const modalRef = this._modalService.open(NgbdModalMarcarAsistencia);
      modalRef.componentInstance.tutoria = event.id;
      modalRef.componentInstance.entidad = 'horario';
      modalRef.componentInstance.text = event.title;
      modalRef.closed.subscribe(() => this.actualizarEventos());
    }

  }


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit(): void {
    this.actualizarEventos();
  }

  actualizarEventos() {
    this.events = [];

    this.gestionTutoriasService.calendar().subscribe(
      value => {
        this.tutorias = value.tutorias;
        this.generarEventos();
      }
    )

    this.gestionHorariosService.calendar().subscribe(
      value => {
        this.horarios = value.horarios;
        this.generarEventos();
      }
    )
  }

  generarEventos() {
    this.events = [];
    for (let tutoria of this.tutorias) {

      var start = new Date(tutoria.fecha);
      start.setUTCHours(Number(tutoria.hora_inicio.substr(0, 2)), Number(tutoria.hora_inicio.substr(3, 2)), 0);

      var end = new Date(tutoria.fecha);
      end.setUTCHours(Number(tutoria.hora_fin.substr(0, 2)), Number(tutoria.hora_fin.substr(3, 2)), 0);

      var color;
      switch (tutoria.asistencia) {
        case 'Pendiente':
          color = colors.yellow;
          break;
        case 'Si':
          color = colors.green;
          break;
        case 'No':
          color = colors.red;
          break;
      }


      this.events.push(
        {
          id: tutoria.id,
          start: start,
          end: end,
          title: this.translate.instant('calendario.tut') + "  de " + tutoria.hora_inicio + " a " + tutoria.hora_fin + " en " + tutoria.espacio + " [ Asistencia: " + tutoria.asistencia + " ]",
          color: color,
          allDay: false,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          actions: this.actions_tutoria,
          meta: {
            type: 'danger'
          }
        }
      )
    }

    for (let horario of this.horarios) {

      var start = new Date(horario.fecha);
      start.setUTCHours(Number(horario.hora_inicio.substr(0, 2)), Number(horario.hora_inicio.substr(3, 2)), 0);

      var end = new Date(horario.fecha);
      end.setUTCHours(Number(horario.hora_fin.substr(0, 2)), Number(horario.hora_fin.substr(3, 2)), 0);

      var color;
      switch (horario.asistencia) {
        case 'Pendiente':
          color = colors.blue;
          break;
        case 'Si':
          color = colors.green;
          break;
        case 'No':
          color = colors.red;
          break;
      }

      this.events.push(
        {
          id: horario.id,
          start: start,
          end: end,
          title: this.translate.instant('calendario.cla') + " de " + horario.hora_inicio + " a " + horario.hora_fin + " en " + horario.espacio + " [ Asistencia: " + horario.asistencia + " ]",
          color: color,
          allDay: false,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          actions: this.actions_horario,
          meta: {
            type: 'danger'
          }
        }
      )
    }
  }

}

@Component({
  selector: 'ngbd-modal-marcar-asistencia-tutoria',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{'gestion-tutorias.marcar-asistencia' | translate}}</h4>
      <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title"
              (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">

      <p class="font-weight-bold">
        {{text}}
      </p>

      <form class="rounded" [formGroup]="tutoriaForm">

        <div class="form-group row">
          <div class="col-12">
            <select class="form-control" formControlName="asistencia" name="asistencia" id="asistencia">
              <option value="" disabled="disabled">{{'gestion-tutorias.select-asistencia' |
                translate}}</option>

              <option value="Si">Si</option>

              <option value="No">No</option>

              <option selected value="Pendiente">Pendiente</option>
            </select>
          </div>
          <div *ngIf="tutoriaForm.get('asistencia')?.errors && tutoriaForm.get('asistencia')?.dirty"
               class="form-text text-danger">
            <small class="col-12"
                   *ngIf="tutoriaForm.get('asistencia')?.hasError('required')">{{'gestion-tutorias.add-asistencia-req' |
              translate}}</small>
          </div>
        </div>

      </form>

    </div>
    <div class="modal-footer justify-content-between">
      <button class="btn btn-secondary"
              (click)="modal.dismiss('cancel click')">{{'gestion-tutorias.cancelar' | translate}}<i
        style="margin-left: 1em; margin-right: 0;" class="fas fa-times-circle"></i></button>
      <button ngbAutofocus (click)="marcar()" [disabled]="!tutoriaForm.valid" class="btn btn-warning m-2"
              type="button">{{'gestion-tutorias.marcar-asistencia' | translate}}<i
        style="margin-left: 1em; margin-right: 0;" class="fas fa-check-square"></i></button>
    </div>
  `
})
export class NgbdModalMarcarAsistencia {

  public tutoria?: string;
  public text?: string;
  public entidad?: string;
  public readonly tutoriaForm: FormGroup;

  constructor(public modal: NgbActiveModal,
              private readonly gestionTutoriasService: GestionTutoriasService,
              private readonly gestionHorariosService: GestionHorariosService,
              private readonly router: Router,
              public ts: TranslateService) {

    this.tutoriaForm = new FormGroup({
        asistencia: new FormControl('', [
          Validators.required
        ])
      }
    )
  }


  marcar() {
    if (this.tutoria) {
      if (this.entidad == 'tutoria') {
        this.gestionTutoriasService.asistencia(this.tutoria, this.tutoriaForm.get('asistencia')?.value).subscribe(() => this.marcarOK(), () => this.marcarOK());
      } else {
        this.gestionHorariosService.asistencia(this.tutoria, this.tutoriaForm.get('asistencia')?.value).subscribe(() => this.marcarOK(), () => this.marcarOK());
      }
    }
  }

  private marcarOK() {
    this.router.navigate(['/panel-principal/calendario'], {queryParams: {flashok: this.ts.instant("gestion-tutorias.asistencia-ok")}});
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.modal.close();
  }

  private marcarError() {
    this.router.navigate(['/panel-principal/calendario'], {queryParams: {flasherror: this.ts.instant("gestion-tutorias.asistencia-nok")}});
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.modal.close();
  }

}
