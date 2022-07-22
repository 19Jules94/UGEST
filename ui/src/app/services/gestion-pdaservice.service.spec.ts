import { TestBed } from '@angular/core/testing';

import { GestionPDAServiceService } from './gestion-pdaservice.service';

describe('GestionPDAServiceService', () => {
  let service: GestionPDAServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionPDAServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
