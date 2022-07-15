import { TestBed } from '@angular/core/testing';

import { GestionEspaciosService } from './gestion-espacios.service';

describe('GestionEspaciosService', () => {
  let service: GestionEspaciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionEspaciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
