import { TestBed } from '@angular/core/testing';

import { GestionCentrosService } from './gestion-centros.service';

describe('GestionCentrosService', () => {
  let service: GestionCentrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionCentrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
