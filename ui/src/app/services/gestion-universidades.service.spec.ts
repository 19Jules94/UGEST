import { TestBed } from '@angular/core/testing';

import { GestionUniversidadesService } from './gestion-universidades.service';

describe('GestionUniversidadesService', () => {
  let service: GestionUniversidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionUniversidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
