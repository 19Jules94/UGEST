import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTutoriaComponent } from './add-tutoria.component';

describe('AddTutoriaComponent', () => {
  let component: AddTutoriaComponent;
  let fixture: ComponentFixture<AddTutoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTutoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTutoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
