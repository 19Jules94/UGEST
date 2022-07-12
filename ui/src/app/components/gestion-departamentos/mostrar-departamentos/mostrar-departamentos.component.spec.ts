import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDepartamentosComponent } from './mostrar-departamentos.component';

describe('MostrarDepartamentosComponent', () => {
  let component: MostrarDepartamentosComponent;
  let fixture: ComponentFixture<MostrarDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarDepartamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
