export interface ProductPromotion {
  href: string;
  products: {
    href: string;
    name: string;
  },
  isActive: string;
  name: string;
  type: string;
  amount: number;
  minimumOrderAmount: number,
  maxAmount: number,
  isExclusive: boolean,
  validFrom: string,
  validTo: string,
  banner: string
}
