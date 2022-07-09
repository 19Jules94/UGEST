import { TestBed } from '@angular/core/testing';

import { GestionPermisosService } from './gestion-permisos.service';

describe('GestionPermisosService', () => {
  let service: GestionPermisosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionPermisosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
