import { TestBed } from '@angular/core/testing';

import { GestionHorariosService } from './gestion-horarios.service';

describe('GestionHorariosService', () => {
  let service: GestionHorariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionHorariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
