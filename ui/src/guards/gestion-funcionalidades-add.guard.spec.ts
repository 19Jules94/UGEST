import { TestBed } from '@angular/core/testing';

import { GestionFuncionalidadesAddGuard } from './gestion-funcionalidades-add.guard';

describe('GestionFuncionalidadesAddGuard', () => {
  let guard: GestionFuncionalidadesAddGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestionFuncionalidadesAddGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
