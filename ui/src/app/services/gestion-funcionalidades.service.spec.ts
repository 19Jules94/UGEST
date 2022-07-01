import { TestBed } from '@angular/core/testing';

import { GestionFuncionalidadesService } from './gestion-funcionalidades.service';

describe('GestionFuncionalidadesService', () => {
  let service: GestionFuncionalidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionFuncionalidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
