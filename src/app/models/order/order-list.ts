import {OrderPayment} from "@app/models/order/order-payment";

export enum OrderStatusChoices {
  WAITING = 'waiting',
  UNPAID = 'unpaid',
  // todo: etc, you can check on api order type OPTIONS
}

export interface OrderList {
  href: string;
  orderNumber: string;
  created: string;
  customer: {
    name: string;
    href: string;
  };
  shippingCost: number,
  discount: number,
  subtotalCost: number,
  totalCost: number,
  totalItems: number;
  featuredProduct: {
    price: number,
    quantity: number,
    weight: number,
    notes: string,
    product: {
      href: string,
      name: string,
      image: string
    }
  };
  children: [];
  orderPayment: OrderPayment;
  status: string;
}

