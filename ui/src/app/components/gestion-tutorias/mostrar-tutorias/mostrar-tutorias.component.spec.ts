import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTutoriasComponent } from './mostrar-tutorias.component';

describe('MostrarTutoriasComponent', () => {
  let component: MostrarTutoriasComponent;
  let fixture: ComponentFixture<MostrarTutoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarTutoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarTutoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
