export interface ProductLine {
  href: string,
  name: string,
  banner: string
  backgroundImage: string,
  brand: ProductLineBrand,
  product: Array<ProductLineItem>
}

export interface ProductLineBrand {
  href: string,
  brandImage: string,
  name: string
}

export interface ProductLineItem {
  href: string,
  name: string,
  image: string,
  price: ProductLineItemPrice
}

export interface ProductLineItemPrice {
  rangeMin: number,
  rangeMax: number,
  rangeMinDiscounted: number,
  rangeMaxDiscounted: number
}
