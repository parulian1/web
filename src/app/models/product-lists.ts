import {ProductDetail} from "@app/models/product-detail";

export interface ProductLists {
  data: Array<ProductDetail>;
  meta: {
    facet: ProductMeta;
    ordering: Array<ProductOrdering>;
  };
}

export interface ProductItems {
  href: string;
  name: string;
  image: string;
  price: {
    minPrice: number,
    maxPrice: number
  };
  vendor: {
    name: string
  };
  inStock: boolean;
  isWishListed: boolean;
}

export interface ProductMeta {
  category?: Array<ProductCategory>;
  color?: Array<ProductColor>;
  vendor?: Array<ProductVendor>;
  price?: Array<ProductPriceRange>;
}

export interface ProductCategory {
  href: string;
  name: string;
  total: number;
  subCategory?: Array<ProductCategory>;
}

export interface ProductColor {
  href: string;
  name: string;
  total: number;
}

export interface ProductVendor {
  href: string;
  name: string;
  total: number;
}

export interface ProductPriceRange {
  href: string;
  name: string;
  total: number;
}

export interface ProductOrdering {
  href: string;
  name: string;
}

