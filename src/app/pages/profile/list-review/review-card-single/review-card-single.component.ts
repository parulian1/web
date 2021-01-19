import {Component, Input, OnInit} from '@angular/core';
import {OrderReview, OrderReviewChildren, OrderReviewChildrenLineItem} from '@app/models/order/order-review';
import {ReviewService} from "@app/services";
import {EntityToSlugPipe} from "@app/shared/utils";
import {Review} from "@app/models";

@Component({
  selector: 'app-review-card-single',
  templateUrl: './review-card-single.component.html',
  styleUrls: ['./review-card-single.component.scss']
})
export class ReviewCardSingleComponent implements OnInit {
  @Input() orderReview: OrderReview;
  @Input() childOrder: OrderReviewChildren;
  @Input() lineItem: OrderReviewChildrenLineItem;

  reviewResult: Review;

  orderHref: string;
  productHref: string;
  productSlug: string;
  isReviewed = false;

  constructor(private reviewService: ReviewService,
              private pipe: EntityToSlugPipe) {
  }

  ngOnInit(): void {
    if (this.lineItem && this.orderReview) {
      this.orderHref = this.orderReview.href;
      this.productHref = this.lineItem.product.href;
      this.productSlug = this.pipe.transform(this.productHref);

      this.checkReviewStatus();
    }
  }

  checkReviewStatus() {
    this.reviewService.checkReviewInOrder(this.orderHref, this.productHref).subscribe(result => {
      const orderSlug = this.pipe.transform(this.orderHref);
      const _result = result.body.filter(data => data.product === this.productSlug && data.order.includes(orderSlug));
      this.isReviewed = _result.length > 0;
      if (this.isReviewed) {
        this.reviewResult = _result;
      }
    })
  }
}
