import { OrderType } from './order.type';
import { OrderStatusType } from './order-status.type';

import { OrderPayment } from './order-payment';
import { SubOrder } from './sub-order';
import {OrderAddress} from './order-address';

/**
 * The customer order, as specifically shown in the
 * order history page of the customer's profile
 */
export interface Order {
  href: string;
  orderNumber: string;
  customer: OrderCustomer;
  created: string;

  type: OrderType;
  status: OrderStatusType;

  shippingCost: number;
  discount: number;
  subtotalCost: number;
  totalCost: number;
  totalItems: number;
  featuredProduct: {
    price: number,
    quantity: 5,
    weight: number,
    notes: string,
    product: {
      href: string,
      name: string,
      image: string;
      upc: string;
    },
    variant: string;
  };

  children: SubOrder[];

  orderPayment: OrderPayment;
  orderAddress: OrderAddress;

  // this can be of any format, yes?
  meta: {
    paymentType: string; // actually a type?
    vaNumber: string;
    dateExpired: string;
  };

}

export interface OrderCustomer {
  name: string;
  href: string;
}

