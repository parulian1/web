export interface HighlightList {
  href: string,
  name: string,
  description: string,
  forVendor: Array<HighlightVendor>,
  sortPriority: number,
  isShowHomepage: boolean,
  deleted: string,
  isActive: boolean,
  highlightImages: Array<HighlightImage>
  productHighlights: Array<Product>
  banner: string,
  background: string
}

export interface HighlightVendor {
  href: string,
  name: string
}

export interface HighlightImage {
  highlight: string,
  href: string,
  image: string,
  type: string
}

export interface ProductCategory {
  href: string,
  name: string
}

export interface ProductPrice {
  minPrice: number,
  maxPrice: number
}

export interface Product {
  href: string,
  name: string,
  image: string,
  category: Array<ProductCategory>,
  price: Array<ProductPrice>,
  vendor: Array<HighlightVendor>,
  displayTag: string
}

export interface ProductHighlight {
  id: number,
  type: string,
  selectedProduct: Array<Product>,
}

export interface HighlightDetail {
  url: string,
  title: string,
  description: string,
  sortPriority: number,
  isShowHomepage: boolean,
  forVendor: Array<HighlightVendor>,
  highlightImages: Array<HighlightImage>,
  productHighlights: Array<Product>
}
