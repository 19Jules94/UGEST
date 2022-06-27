import { TestBed } from '@angular/core/testing';

import { GestionAccionesAddGuard } from './gestion-acciones-add.guard';

describe('GestionAccionesAddGuard', () => {
  let guard: GestionAccionesAddGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestionAccionesAddGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
