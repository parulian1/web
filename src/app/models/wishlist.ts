export interface Wishlist {
  href: string;
  product: Product;
  quantity?: number;
  warehouses?: Warehouse[];
  selectedWarehouse?: Warehouse;
}

export interface Product {
  href: string;
  name: string;
  description: string;
  upc: string;
  brand: {
    href: string;
    name: string;
  };
  media: [
    {
      product: string;
      image: string;
      href: string;
      type: string;
      youtubeVideoId: string;
    }
  ];
  unitPrice: {
    current?: number;
    regular?: number;
  };
}

export class Warehouse {
  code: string;
  financialReportingAs: any;
  href: string;
  internalNotes: string;
  name: string;
  quantity: number;
  address: Address
}

export class Address {
  country: string;
  province: string;
  city: string;
  distinct: string;
  subDistinct: string;
  street: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  notes: string;
}

export interface StatusWishlist {
  status: string;
}
