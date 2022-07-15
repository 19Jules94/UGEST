import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEspacioComponent } from './edit-espacio.component';

describe('EditEspacioComponent', () => {
  let component: EditEspacioComponent;
  let fixture: ComponentFixture<EditEspacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEspacioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEspacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
