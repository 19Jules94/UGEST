import { TestBed } from '@angular/core/testing';

import { GestionAccionesMTGuard } from './gestion-acciones-mt.guard';

describe('GestionAccionesMTGuard', () => {
  let guard: GestionAccionesMTGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestionAccionesMTGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
