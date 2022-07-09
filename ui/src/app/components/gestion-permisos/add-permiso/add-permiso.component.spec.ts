import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPermisoComponent } from './add-permiso.component';

describe('AddPermisoComponent', () => {
  let component: AddPermisoComponent;
  let fixture: ComponentFixture<AddPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPermisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
