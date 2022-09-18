import { TestBed } from '@angular/core/testing';

import { FossilsService } from './fossils.service';

describe('FossilsService', () => {
  let service: FossilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FossilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
