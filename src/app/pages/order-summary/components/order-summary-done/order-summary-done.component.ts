import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '@app/core';
import { Configuration } from '@app/models';
import { OrderSummary } from '@app/models/checkout';
import { AnalyticGtmService } from '@app/services/web-analytic';
import { GtagService } from '@app/library/gtagjs/gtag.service';

@Component({
  selector: 'app-order-summary-done',
  templateUrl: './order-summary-done.component.html',
  styleUrls: ['./order-summary-done.component.scss']
})
export class OrderSummaryDoneComponent implements OnInit {
  @Input() orderSummary: OrderSummary;
  @Input() config: Configuration;

  gaAccountType = '';

  constructor(private appConfigService: ConfigService,
              private analyticGtmService: AnalyticGtmService,
              private gtag: GtagService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.gaAccountType = this.appConfigService.config?.gaAccountType;

    this.setTag();
  }

  setTag() {
    if (this.gaAccountType === 'gtm') {
      this.analyticGtmService.pageView('Order Summary Done', this.router.url);
    } else {
      this.gtag.pageView('Order Summary Done', this.router.url);
    }
  }

}
