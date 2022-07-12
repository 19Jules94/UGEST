import { TestBed } from '@angular/core/testing';

import { GestionAsignaturasService } from './gestion-asignaturas.service';

describe('GestionAsignaturasService', () => {
  let service: GestionAsignaturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionAsignaturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
