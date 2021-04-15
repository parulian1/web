import { Component, Input, OnInit } from '@angular/core';

import { Configuration } from '@app/models';
import { OrderSummary } from '@app/models/checkout';

@Component({
  selector: 'app-order-summary-done',
  templateUrl: './order-summary-done.component.html',
  styleUrls: ['./order-summary-done.component.scss']
})
export class OrderSummaryDoneComponent implements OnInit {
  @Input() orderSummary: OrderSummary;
  @Input() config: Configuration;

  constructor() {
  }

  ngOnInit(): void {
  }

}
