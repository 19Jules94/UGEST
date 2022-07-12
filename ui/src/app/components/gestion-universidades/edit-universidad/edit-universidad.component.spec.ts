import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUniversidadComponent } from './edit-universidad.component';

describe('EditUniversidadComponent', () => {
  let component: EditUniversidadComponent;
  let fixture: ComponentFixture<EditUniversidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUniversidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUniversidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
