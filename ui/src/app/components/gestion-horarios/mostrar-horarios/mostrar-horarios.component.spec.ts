import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarHorariosComponent } from './mostrar-horarios.component';

describe('MostrarHorariosComponent', () => {
  let component: MostrarHorariosComponent;
  let fixture: ComponentFixture<MostrarHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
