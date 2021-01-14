import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Logger} from '@app/core';
import {PagedResponse} from "@app/core/pagination";
import {OrderReview} from "@app/models/order/order-review";

const log = new Logger('ListReview');

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.scss']
})
export class ListReviewComponent implements OnInit {

  pageNum = 0;
  page: PagedResponse<OrderReview>
  orderReviews: OrderReview[] = []

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.checkResolver();
  }

  checkResolver() {
    this.route.data.subscribe((data: { orderReviews: PagedResponse<OrderReview> }) => {
      this.pageNum = data.orderReviews.pageNumber;

      this.orderReviews = data.orderReviews.entities;
      console.log('list reviews', this.orderReviews);
    });
  }
}
