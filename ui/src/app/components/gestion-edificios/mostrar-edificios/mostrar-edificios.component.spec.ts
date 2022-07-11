import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEdificiosComponent } from './mostrar-edificios.component';

describe('MostrarEdificiosComponent', () => {
  let component: MostrarEdificiosComponent;
  let fixture: ComponentFixture<MostrarEdificiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarEdificiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarEdificiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
