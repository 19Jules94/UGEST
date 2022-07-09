import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAAcademicoComponent } from './add-aacademico.component';

describe('AddAAcademicoComponent', () => {
  let component: AddAAcademicoComponent;
  let fixture: ComponentFixture<AddAAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAAcademicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
