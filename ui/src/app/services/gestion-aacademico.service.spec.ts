import { TestBed } from '@angular/core/testing';

import { GestionAacademicoService } from './gestion-aacademico.service';

describe('GestionAacademicoService', () => {
  let service: GestionAacademicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionAacademicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
