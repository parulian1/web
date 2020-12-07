import { TestBed } from '@angular/core/testing';

import { OrderShipmentService } from '@app/services/order-shipment.service';

describe('OrderShipmentService', () => {
  let service: OrderShipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderShipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
