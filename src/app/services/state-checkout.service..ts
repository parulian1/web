/**
 * Store and manage state for checkout page
 *
 */
import { Addresses } from '@app/models/addresses';
import {DropshipOption, ShippingCost, ShippingMethod} from '@app/models/shipping-method';
import { PaymentMethodType } from "@app/models/payment-method";

export class StateCheckout {

  public stateCheckout = {
    stateAddress: null,
    stateShippingMethod: null,
    statePayment: null,
    statePaymentMethod: null,
    shippingSelect: null,
    stateDropship: null,
  };
  public err: Array<string> = [];
  public savedAddress: any;
  public savedTokenId: string = null;  // credit card saved token id

  get getSavedAddress(): any {
    return this.savedAddress;
  }

  set shippingErr(shippingErr: string) {
    this.err.push(shippingErr);
  }

  set stateAddress(address: Addresses) {
    this.stateCheckout.stateAddress = address;
  }

  set stateShippingMethod(method: ShippingCost[]) {
    this.stateCheckout.stateShippingMethod = method;
  }

  set statePayment(payment: PaymentMethodType) {
    this.stateCheckout.statePayment = payment;
  }
  set statePaymentMethod(payment: string) {
    this.stateCheckout.statePaymentMethod = payment;
  }

  set stateShippingSelect(shippingSelect: Array<{ method?: ShippingCost, fullWarehouse?: string, warehouse: string, status?: boolean }>) {
    this.stateCheckout.shippingSelect = shippingSelect;
  }

  get getShippingErr(): Array<string> {
    return this.err;
  }

  get getStateAddress(): Addresses {
    return this.stateCheckout.stateAddress;
  }

  get getStateShippingMethod(): ShippingMethod | ShippingMethod[] {
    return this.stateCheckout.stateShippingMethod;
  }


  get getStatePayment(): PaymentMethodType {
    return this.stateCheckout.statePayment;
  }
  get getStatePaymentMethod(): string {
    return this.stateCheckout.statePaymentMethod;
  }

  get getStateShippingSelect(): Array<{ method?: ShippingCost, fullWarehouse?: string, warehouse: string, status?: boolean }> {
    return this.stateCheckout.shippingSelect;
  }

  get canCheckout(): boolean {
    return (!!this.getStateAddress) && (!!this.getStateShippingMethod) && (!!this.getStatePaymentMethod);
  }

  removeSavedTokenId(): void {
    this.savedTokenId = null;
  }

  set stateDropshipOption(dropship: DropshipOption) {

    if (dropship.active) {
      this.stateCheckout.stateDropship = dropship;
    } else {
      this.stateCheckout.stateDropship = null;
    }
  }

  get getStateDropshipOption(): DropshipOption {
    return this.stateCheckout.stateDropship;
  }
}
