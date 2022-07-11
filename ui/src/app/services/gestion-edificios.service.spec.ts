import { TestBed } from '@angular/core/testing';

import { GestionEdificiosService } from './gestion-edificios.service';

describe('GestionEdificiosService', () => {
  let service: GestionEdificiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionEdificiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
