import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRolesUsuariosComponent } from './mostrar-roles-usuarios.component';

describe('MostrarRolesUsuariosComponent', () => {
  let component: MostrarRolesUsuariosComponent;
  let fixture: ComponentFixture<MostrarRolesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarRolesUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarRolesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
