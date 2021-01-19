import { TestBed } from '@angular/core/testing';

import { PromotionListResolverService } from './promotion-list-resolver.service';

describe('PromotionListResolverService', () => {
  let service: PromotionListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
