import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CheckoutService } from "@app/services";
import { OrderSummary } from "@app/models/checkout";
import {Title} from "@angular/platform-browser";

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.scss"],
})
export class OrderSummaryComponent implements OnInit {
  orderNumber: string;
  orderSummary: OrderSummary;

  constructor(private route: ActivatedRoute, private service: CheckoutService, private title: Title) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((resp) => {
      this.orderNumber = resp.order_id;
      this.getOrderSummary(this.orderNumber);
      this.title.setTitle('Order Summary ' + ' - Martha Tilaar Shop')

    });
  }

  getOrderSummary(orderNumber: string) {
    this.service.fetchOrderSummary(orderNumber).subscribe((res) => {
      this.orderSummary = res.body;
    });
  }
}
