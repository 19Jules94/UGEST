import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEspacioComponent } from './add-espacio.component';

describe('AddEspacioComponent', () => {
  let component: AddEspacioComponent;
  let fixture: ComponentFixture<AddEspacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEspacioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEspacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
