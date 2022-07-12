import { TestBed } from '@angular/core/testing';

import { GestionTitulacionesService } from './gestion-titulaciones.service';

describe('GestionTitulacionesService', () => {
  let service: GestionTitulacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionTitulacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
