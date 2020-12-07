import {Component, Input, OnInit} from '@angular/core';
import {Logger} from '@app/core';

import {ProductDetail} from '@app/models/product-detail';
import {Stars} from '@app/models/product/stars';
import {RatingSummary} from "@app/models";

const log = new Logger('RatingReview');

@Component({
  selector: 'app-rating-review',
  template: `
    <div class="rating-review">
      <div class="rating-review-title">Ratings & Reviews</div>
      <div class="rating-review-stats">
        <app-rating-review-stars [rating]="rating"></app-rating-review-stars>
        <app-rating-review-bar [stars]="stars" [totalReview]="totalReview"></app-rating-review-bar>
        <app-rating-review-percentage [recommendation]="recommendation"></app-rating-review-percentage>
      </div>
      <div class="rating-review-comments" *ngIf="review.length !== 0; else elseReview">
        <app-rating-review-comments [review]="review" [product]="product"></app-rating-review-comments>
      </div>
      <ng-template #elseReview>
        <div class="rating-review-comments">
          <span>Belum ada ulasan</span>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .rating-review {
      display: flex;
      flex-direction: column;
      margin-top: 24px;
    }

    .rating-review-title {
      font-family: var(--font-secondary);
      font-size: 28px;
      line-height: 37px;
    }

    .rating-review-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
    }

    .rating-review-comments {
      margin-top: 24px;
    }

    @media only screen and (max-width: 500px) {
      .rating-review {
        width: 100%;
      }

      .rating-review-title {
        font-size: 18px;
        line-height: 24px;
      }

      .rating-review-stats {
        width: 100%;
      }
    }
  `]
})
export class RatingReviewComponent implements OnInit {
  @Input() product: ProductDetail;
  @Input() review: any;
  @Input() ratingSummary: RatingSummary;

  rating: string;
  stars: Stars;
  recommendation: string;
  totalReview: string;

  // review: Review;

  constructor() {
  }

  ngOnInit(): void {
    this.rating = this.ratingSummary.rating;
    this.stars = this.ratingSummary.stars;
    this.recommendation = this.ratingSummary.recommendation;
    this.totalReview = this.ratingSummary.totalReview;
  }

}
