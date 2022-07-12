import { TestBed } from '@angular/core/testing';

import { GestionDepartamentosService } from './gestion-departamentos.service';

describe('GestionDepartamentosService', () => {
  let service: GestionDepartamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionDepartamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
