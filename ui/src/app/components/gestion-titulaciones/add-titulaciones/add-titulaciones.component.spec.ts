import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTitulacionesComponent } from './add-titulaciones.component';

describe('AddTitulacionesComponent', () => {
  let component: AddTitulacionesComponent;
  let fixture: ComponentFixture<AddTitulacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTitulacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTitulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
