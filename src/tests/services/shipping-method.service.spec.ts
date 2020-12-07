import { TestBed } from '@angular/core/testing';

import { ShippingMethodService } from '@app/services/shipping-method.service';

describe('ShippingMethodService', () => {
  let service: ShippingMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
