import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarGruposComponent } from './mostrar-grupos.component';

describe('MostrarGruposComponent', () => {
  let component: MostrarGruposComponent;
  let fixture: ComponentFixture<MostrarGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
