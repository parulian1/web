import {OrderWarehouse} from './order-warehouse';

export interface SubOrder {
  warehouse: OrderWarehouse;
  data: Array<{
    orderNumber: string;
    shippingMethod: string;
    shippingCost: number;
    status: string;
    shipmentHistory: {
      href: string,
      logisticsPartner: string,
      airwayBillNumber: string,
      shippingLabelUrl: string,
      histories: [
        {
          href: string,
          created: string,
          status: string,
          notes: string,
          shipment: string
        }
      ],
    };
    lineItems: Array<{
      price: string,
      quantity: number,
      weight: string,
      notes: string,
      product: {
        href: string,
        name: string,
        image: string
      }
    }>;
    href?: string;
  }>;
}
