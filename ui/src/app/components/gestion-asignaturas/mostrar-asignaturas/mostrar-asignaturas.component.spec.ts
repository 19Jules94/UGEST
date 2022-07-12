import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarAsignaturasComponent } from './mostrar-asignaturas.component';

describe('MostrarAsignaturasComponent', () => {
  let component: MostrarAsignaturasComponent;
  let fixture: ComponentFixture<MostrarAsignaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarAsignaturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarAsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
