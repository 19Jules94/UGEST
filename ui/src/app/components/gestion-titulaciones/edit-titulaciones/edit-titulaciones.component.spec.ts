import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTitulacionesComponent } from './edit-titulaciones.component';

describe('EditTitulacionesComponent', () => {
  let component: EditTitulacionesComponent;
  let fixture: ComponentFixture<EditTitulacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTitulacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTitulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
