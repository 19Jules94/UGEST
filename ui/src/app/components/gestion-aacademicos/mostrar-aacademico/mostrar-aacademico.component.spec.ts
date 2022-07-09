import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarAAcademicoComponent } from './mostrar-aacademico.component';

describe('MostrarAAcademicoComponent', () => {
  let component: MostrarAAcademicoComponent;
  let fixture: ComponentFixture<MostrarAAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarAAcademicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarAAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
