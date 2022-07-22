import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPDAComponent } from './gestion-pda.component';

describe('GestionPDAComponent', () => {
  let component: GestionPDAComponent;
  let fixture: ComponentFixture<GestionPDAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPDAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPDAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
