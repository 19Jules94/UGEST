import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCentroComponent } from './mostrar-centro.component';

describe('MostrarCentroComponent', () => {
  let component: MostrarCentroComponent;
  let fixture: ComponentFixture<MostrarCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
