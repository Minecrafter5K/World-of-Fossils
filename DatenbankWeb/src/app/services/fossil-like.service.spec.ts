import { TestBed } from '@angular/core/testing';

import { FossilLikeService } from './fossil-like.service';

describe('FossilLikeService', () => {
  let service: FossilLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FossilLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
