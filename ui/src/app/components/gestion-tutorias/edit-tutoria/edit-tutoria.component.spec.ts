import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTutoriaComponent } from './edit-tutoria.component';

describe('EditTutoriaComponent', () => {
  let component: EditTutoriaComponent;
  let fixture: ComponentFixture<EditTutoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTutoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTutoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
