import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddressFormComponent } from '@app/pages/checkout/checkout-address/containers/add-address-dialog/add-address-form/add-address-form.component';

describe('AddAddressFormComponent', () => {
  let component: AddAddressFormComponent;
  let fixture: ComponentFixture<AddAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAddressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
