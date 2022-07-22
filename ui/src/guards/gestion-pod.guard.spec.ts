import { TestBed } from '@angular/core/testing';

import { GestionPODGuard } from './gestion-pod.guard';

describe('GestionPODGuard', () => {
  let guard: GestionPODGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestionPODGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
