import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTitulacionesComponent } from './mostrar-titulaciones.component';

describe('MostrarTitulacionesComponent', () => {
  let component: MostrarTitulacionesComponent;
  let fixture: ComponentFixture<MostrarTitulacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarTitulacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarTitulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
