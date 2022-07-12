import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAsignaturasComponent } from './edit-asignaturas.component';

describe('EditAsignaturasComponent', () => {
  let component: EditAsignaturasComponent;
  let fixture: ComponentFixture<EditAsignaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAsignaturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
