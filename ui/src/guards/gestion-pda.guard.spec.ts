import { TestBed } from '@angular/core/testing';

import { GestionPDAGuard } from './gestion-pda.guard';

describe('GestionPDAGuard', () => {
  let guard: GestionPDAGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestionPDAGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
