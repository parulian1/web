import {Stars} from "@app/models/product";

export interface Review {
  score: number;
  review: string;
  order: string;
  href: string;
  product: string;
  productName: string;
  reviewerName: string;
  dateCreated: string;
  vote: ReviewVote;
}

export interface ReviewVote {
  likes: number;
  dislikes: number;
  isLike: boolean;
  isDislike: boolean;
}

export interface RatingSummary {
  rating: string;
  recommendation: string;
  stars: Stars;
  totalReview: string;
  reviewHref: string;
}
