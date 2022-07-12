import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAsignaturasComponent } from './add-asignaturas.component';

describe('AddAsignaturasComponent', () => {
  let component: AddAsignaturasComponent;
  let fixture: ComponentFixture<AddAsignaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAsignaturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
