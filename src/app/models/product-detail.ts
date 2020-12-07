import { NamedHrefEntity } from './base';
import {ProductAttributeType, Stars} from '@app/models/product';

export interface ProductDetail extends NamedHrefEntity {
  upc: string;

  vendor: NamedHrefEntity;
  productClass: NamedHrefEntity;
  category: NamedHrefEntity;

  description: string;
  weight: number;
  media: Array<ProductDetailMedia>;
  priceLists: Array<PriceLists>;
  related?: Array<ProductDetailRelated>;
  attributes?: any;
  isWishlisted: boolean;
  variants: Array<ProductDetailVariants>;
  parent: string;
  structure: string;

  tags: Array<string>;

}

export interface PriceLists {
  href: string;
  ranges: Array<PriceRanges>;
  type: string;
  isProgressive: boolean;
  product: string;
  platforms: Array<ProductPlatforms>;
  locations: Array<ProductLocations>;
}

export interface PriceRanges {
  href: string;
  price: number;
  minQuantity: number;
  maxQuantity: number;
  priceList: string;
  activePromotionalPrices: Array<PromotionalPrice>;
}


export type PromotionalPriceType = 'percentage' | 'amount_off' | 'override_price';


export interface PromotionalPrice extends NamedHrefEntity {
  netPrice: number;
  isActive: boolean;
  type: PromotionalPriceType;
  amount: number;
  minimumOrderAmount: number;
  maxAmount: number;
  isExclusive: boolean;
  validFrom: string;
  validTo?: string;
}


// default schema, nothing returned yet from API
export interface ProductPlatforms {
  href: string;
  name: string;
}

// default schema, nothing returned yet from API
export interface ProductLocations {
  href: string;
  name: string;
}

export interface ProductDetailVendor {
  href: string;
  name: string;
}

export interface ProductDetailMedia {
  href: string;
  type: string;
  youtubeVideoId?: string;
  image: string;
  product: string;
}

export interface ProductDetailPrice {
  current: number;
  regular?: number;
  priceRange?: Array<PriceRange>;
}

export interface PriceRange {
  price: number;
  minQuantity: number;
  maxQuantity: number;
}

export interface ProductDetailRelated {
  href: string;
  name: string;
  vendor: ProductDetailVendor;
  price: ProductDetailPrice;
  image: string;
}

export interface ProductDetailAttributes {
  name: string;
  type: string;
  value: string;
  href?: string;
  image?: string;
  variants?: Array<ProductDetailVariants>;
}

export interface ProductDetailVariants {
  href: string;
  name: string;
  image: string;
  attributes: any;
}

export interface ProductAttributes {
  name: string;
  href: string;
  type: ProductAttributeType;
  productClass?: string;
  min: number;
  max: number;
  isSearchable: boolean;
  isFilterable: boolean;
}

export interface ProductClass {
  name: string;
  href: string;
  type: string;
  requiresShipping: boolean;
  trackStock: boolean;
  isPerishable: boolean;
  attributes: Array<ProductAttributes>;
  productCount: number;

}
