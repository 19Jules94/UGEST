import { TestBed } from '@angular/core/testing';

import { GestionPODServiceService } from './gestion-podservice.service';

describe('GestionPODServiceService', () => {
  let service: GestionPODServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionPODServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
