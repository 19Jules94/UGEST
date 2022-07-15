import { TestBed } from '@angular/core/testing';

import { GestionGruposService } from './gestion-grupos.service';

describe('GestionGruposService', () => {
  let service: GestionGruposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionGruposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
