import {Component, Input, OnInit} from '@angular/core';
import {ReviewService} from "@app/services";
import {OrderWarehouse} from "@app/models/order/order-warehouse";
import {EntityToSlugPipe} from "@app/shared/utils";

@Component({
  selector: 'app-order-product-box',
  templateUrl: './order-product-box.component.html',
  styleUrls: ['./order-product-box.component.scss']
})
export class OrderProductBoxComponent implements OnInit {
  @Input() lineItems: {
    price: string,
    quantity: number,
    weight: string,
    notes: string,
    product: {
      href: string,
      name: string,
      image: string
    }
  };
  @Input() warehouse: string;
  @Input() length: number;
  @Input() status: string;
  @Input() order: string;

  isReviewed = false;
  productSlug: string;

  constructor(private reviewService: ReviewService,
              private slugPipe: EntityToSlugPipe) {
  }

  ngOnInit(): void {
    this.checkReviewStatus();
  }

  changeSource($event: any) {
    $event.target.src = `/assets/default-image.png`;
  }

  checkReviewStatus() {
    if (this.lineItems.product.href && this.order) {
      this.reviewService.checkReviewInOrder(this.order, this.lineItems.product.href).subscribe(result => {
        this.productSlug = this.slugPipe.transform(this.lineItems.product.href);
        const orderSlug = this.slugPipe.transform(this.order);

        this.isReviewed = result.body.filter(data => data.product === this.productSlug && data.order.includes(orderSlug)).length > 0;
      })
    }
  }
}
