import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEdificioComponent } from './edit-edificio.component';

describe('EditEdificioComponent', () => {
  let component: EditEdificioComponent;
  let fixture: ComponentFixture<EditEdificioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEdificioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
