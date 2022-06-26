import { TestBed } from '@angular/core/testing';

import { GestionAccionesService } from './gestion-acciones.service';

describe('GestionAccionesService', () => {
  let service: GestionAccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionAccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
