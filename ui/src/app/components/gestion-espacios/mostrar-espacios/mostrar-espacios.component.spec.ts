import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEspaciosComponent } from './mostrar-espacios.component';

describe('MostrarEspaciosComponent', () => {
  let component: MostrarEspaciosComponent;
  let fixture: ComponentFixture<MostrarEspaciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarEspaciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarEspaciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
