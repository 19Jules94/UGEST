import { TestBed } from '@angular/core/testing';

import { GestionRolesUsuarioService } from './gestion-roles-usuario.service';

describe('GestionRolesUsuarioService', () => {
  let service: GestionRolesUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionRolesUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
