import {Component, Input, OnInit} from '@angular/core';
import {OrderHistoryService} from '@app/services';
import {Logger} from '@app/core';
import {SubOrder} from '@app/models/order/sub-order';
import {OrderReview} from "@app/models/order/order-review";
import {EntityToSlugPipe} from "@app/shared/utils";

const log = new Logger('ReviewCard');

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {
  @Input() orderReview: OrderReview;

  constructor(private orderService: OrderHistoryService,
              private pipe: EntityToSlugPipe) {
  }

  ngOnInit(): void {
  }
}
