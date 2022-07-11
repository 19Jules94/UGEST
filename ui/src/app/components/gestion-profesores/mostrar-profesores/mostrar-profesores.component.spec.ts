import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarProfesoresComponent } from './mostrar-profesores.component';

describe('MostrarProfesoresComponent', () => {
  let component: MostrarProfesoresComponent;
  let fixture: ComponentFixture<MostrarProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarProfesoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
