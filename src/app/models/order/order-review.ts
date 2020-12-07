import {HrefEntity, NamedHrefEntity} from "@app/models/base";

export interface OrderReview extends HrefEntity{
  orderNumber: string;
  children: OrderReviewChildren[];
  modified: string;
}

export interface OrderReviewChildren extends HrefEntity{
  lineItems: OrderReviewChildrenLineItem[];
  warehouse: OrderReviewWarehouse;
  orderNumber: string;
}

export interface OrderReviewChildrenLineItem {
  price: number;
  quantity: number;
  weight: string;
  notes: string;
  product: OrderReviewChildrenLineItemProduct;
  variant: any;
  review?: OrderReviewDetail;
}

export interface OrderReviewChildrenLineItemProduct extends NamedHrefEntity {
  image: string;
  upc: string;
}

export interface OrderReviewWarehouse {
  name: string;
  code: string;
  slug: string;
}

export interface OrderReviewDetail {
  score: number;
  review: string;
  href: string;
  reviewerName: string;
  dateCreated: string;
}
