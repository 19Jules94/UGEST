import { TestBed } from '@angular/core/testing';

import { GestionEspacioService } from './gestion-espacio.service';

describe('GestionEspacioService', () => {
  let service: GestionEspacioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionEspacioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
