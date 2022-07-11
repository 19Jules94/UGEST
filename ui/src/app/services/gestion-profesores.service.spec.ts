import { TestBed } from '@angular/core/testing';

import { GestionProfesoresService } from './gestion-profesores.service';

describe('GestionProfesoresService', () => {
  let service: GestionProfesoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionProfesoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
