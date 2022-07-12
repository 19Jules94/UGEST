import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRolUsuarioComponent } from './add-rol-usuario.component';

describe('AddRolUsuarioComponent', () => {
  let component: AddRolUsuarioComponent;
  let fixture: ComponentFixture<AddRolUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRolUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRolUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
