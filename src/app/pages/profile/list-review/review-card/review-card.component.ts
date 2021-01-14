import {Component, Input, OnInit} from '@angular/core';
import {Logger} from '@app/core';

import {OrderReview} from '@app/models/order/order-review';

const log = new Logger('ReviewCard');

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {
  @Input() orderReview: OrderReview;

  constructor() {
  }

  ngOnInit(): void {
  }
}
