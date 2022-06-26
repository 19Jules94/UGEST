import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarAccionesComponent } from './mostrar-acciones.component';

describe('MostrarAccionesComponent', () => {
  let component: MostrarAccionesComponent;
  let fixture: ComponentFixture<MostrarAccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarAccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
