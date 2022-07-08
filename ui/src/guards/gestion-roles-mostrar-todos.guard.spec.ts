import { TestBed } from '@angular/core/testing';

import { GestionRolesMostrarTodosGuard } from './gestion-roles-mostrar-todos.guard';

describe('GestionRolesMostrarTodosGuard', () => {
  let guard: GestionRolesMostrarTodosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestionRolesMostrarTodosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
