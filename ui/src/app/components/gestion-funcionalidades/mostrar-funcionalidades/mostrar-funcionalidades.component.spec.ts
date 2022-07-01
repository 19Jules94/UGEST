import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarFuncionalidadesComponent } from './mostrar-funcionalidades.component';

describe('MostrarFuncionalidadesComponent', () => {
  let component: MostrarFuncionalidadesComponent;
  let fixture: ComponentFixture<MostrarFuncionalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarFuncionalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarFuncionalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
