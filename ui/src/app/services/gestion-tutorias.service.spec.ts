import { TestBed } from '@angular/core/testing';

import { GestionTutoriasService } from './gestion-tutorias.service';

describe('GestionTutoriasService', () => {
  let service: GestionTutoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionTutoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
