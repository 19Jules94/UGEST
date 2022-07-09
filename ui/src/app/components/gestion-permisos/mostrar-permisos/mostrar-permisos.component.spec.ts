import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPermisosComponent } from './mostrar-permisos.component';

describe('MostrarPermisosComponent', () => {
  let component: MostrarPermisosComponent;
  let fixture: ComponentFixture<MostrarPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarPermisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
