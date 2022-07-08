import { TestBed } from '@angular/core/testing';

import { GestionRolesAddGuard } from './gestion-roles-add.guard';

describe('GestionRolesAddGuard', () => {
  let guard: GestionRolesAddGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestionRolesAddGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
