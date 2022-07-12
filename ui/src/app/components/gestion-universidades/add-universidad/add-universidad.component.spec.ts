import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUniversidadComponent } from './add-universidad.component';

describe('AddUniversidadComponent', () => {
  let component: AddUniversidadComponent;
  let fixture: ComponentFixture<AddUniversidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUniversidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUniversidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
