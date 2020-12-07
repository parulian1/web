import { TestBed } from '@angular/core/testing';

import { PagePagination } from '@app/services/simple-paginate.service';

describe('SimplePaginateService', () => {
  let service: PagePagination;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagePagination);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
