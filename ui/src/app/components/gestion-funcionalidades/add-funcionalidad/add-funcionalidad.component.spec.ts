import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFuncionalidadComponent } from './add-funcionalidad.component';

describe('AddFuncionalidadComponent', () => {
  let component: AddFuncionalidadComponent;
  let fixture: ComponentFixture<AddFuncionalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFuncionalidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFuncionalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
