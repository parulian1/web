import { DropshipMeta } from "@app/models/shipping-method";

export class Checkout {
  totals: CheckoutTotals;
  shipping: Array<CheckoutShipping>;
  payment: CheckoutPayment;
  address: CheckoutAddress;
  dropship?: DropshipMeta;
}

export interface CheckoutTotals {
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total: number;
}

export interface CheckoutShipping {
  warehouse: string;
  method: string;
  service: string;
  cost: number;
  separate_delivery: boolean;
}

export interface CheckoutPayment {
  method: string;
}

export interface CheckoutAddress {
  ship_to_name: string;
  country: string;
  state: string;
  city: string;
  district: string;
  street: string;
  zipcode: string;
  phone_number: string;
}

export interface OrderSummary {
  created: string;
  href: string;
  orderNumber: string;
  payment: SummaryPayment;
}

export interface SummaryPayment {
  amount: number;
  dateExpired: string;
  guide: string;
  logo: string;
  name: string;
  vaNumber: string;
  status: string;
  type: string;
  accountNumber?: string;
  accountHoldNumber?: string;
}
