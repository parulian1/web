
export interface OrderShipment {
  href: string,
  order: string,
  histories: [
    {
      href: string,
      created: string,
      status: string,
      notes: string,
      shipment: string
    },
  ],
  status: string,
  airwayBillNumber: string,
  shippingLabelUrl: string,
  deliveryLabelUrl: string,
  logisticsPartner: string,
  properties: {},
  notes: string
}
