import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPODComponent } from './gestion-pod.component';

describe('GestionPODComponent', () => {
  let component: GestionPODComponent;
  let fixture: ComponentFixture<GestionPODComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPODComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPODComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
