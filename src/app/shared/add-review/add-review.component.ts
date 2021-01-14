import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Order} from '@app/models/order';
import {Logger} from '@app/core';
import {ReviewService} from '@app/services';
import {EntityToSlugPipe} from "@app/shared/utils";

const log = new Logger('AddReview');

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit, DoCheck {
  parentOrder: Order;
  product: any;
  productSlug: string;
  warehouseSlug: string;

  parentOrderNumber: string;
  orderWarehouse: string;
  orderDate: string;
  reviewStatus: string;

  productImg: string;
  productName: string;
  productHref: string;

  review = '';
  maxChars = 500;
  rating = 0;
  color = '#F2994A';
  isButtonDisabled = true;

  orderHref: string;

  constructor(
    private route: ActivatedRoute,
    private service: ReviewService,
    private router: Router,
    private pipe: EntityToSlugPipe) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      if (param.keys.length !== 0) {
        this.productSlug = param.get('productSlug');
        this.warehouseSlug = param.get('warehouse');
        this.orderHref = param.get('orderHref');
      }
    });
    this.route.data.subscribe((data: { order: any }) => {
      this.parentOrder = data.order[0];
      this.product = data.order[2];
      this.checkStatus(data.order);
    });

    this.setOrderInfo();
    this.setProductInfo();
    this.isButtonDisabled = true;
  }

  ngDoCheck(): void {
    this.isButtonDisabled = this.rating === 0 || this.review.length < 10;
  }

  setOrderInfo() {
    this.parentOrderNumber = this.parentOrder.orderNumber;
    this.parentOrder.children.forEach(orderChild => {
      if (orderChild.warehouse?.slug === this.warehouseSlug) {
        this.orderWarehouse = orderChild.warehouse.name;
        orderChild.data.forEach(child_info => {
          this.orderHref = child_info.href;
        });
      }
    });
    log.info(this.parentOrder);
    this.orderDate = this.parentOrder.orderPayment.completedDate;
  }

  setProductInfo() {
    this.productImg = this.product.productImage;
    this.productName = this.product.productName;
    this.productHref = this.product.productHref;
  }

  onRatingUpdated($event: any) {
    this.rating = $event;
  }

  createReview() {
    const params = {
      review: this.review,
      score: this.rating,
      order: this.orderHref ?? this.parentOrder.href,
      product: this.pipe.transform(this.productHref)
    };

    this.service.createReview(params).subscribe(res => {
      if (res.status === 201) {
        this.router.navigate(['/profile/orders']);
      }
    });
  }

  checkStatus(order: any) {
    const orderHref = order[0].href;
    const productHref = order[2].productHref;

    this.service.checkReviewInOrder(orderHref, productHref).subscribe(result => {
      this.reviewStatus = result.body.filter(data => data.product === this.productSlug && data.order.includes(order[0].orderNumber)).length > 0 ? 'Sudah Diulas' : 'Belum Diulas';
    });
  }
}
