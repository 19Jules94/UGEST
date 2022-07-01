import { TestBed } from '@angular/core/testing';

import { GestionFuncionalidadesMTGuard } from './gestion-funcionalidades-mt.guard';

describe('GestionFuncionalidadesMTGuard', () => {
  let guard: GestionFuncionalidadesMTGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestionFuncionalidadesMTGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
