import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAddressFormDialogComponent } from './checkout-address-form-dialog.component';

describe('CheckoutAddressFormDialogComponent', () => {
  let component: CheckoutAddressFormDialogComponent;
  let fixture: ComponentFixture<CheckoutAddressFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutAddressFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutAddressFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
