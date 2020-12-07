import {AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnInit} from '@angular/core';
import {Cart, CartTotals} from '@app/models/cart';
import {Router} from "@angular/router";
import {Checkout} from "@app/models/checkout";
import {CheckoutService} from "@app/services/checkout.service";
import {EntityToSlugPipe} from "@app/shared/utils/entity-to-slug.pipe";
import {Logger} from "@app/core";

const log = new Logger('TotalSummary');

@Component({
  selector: 'app-total-summary',
  templateUrl: './total-summary.component.html',
  styleUrls: ['./total-summary.component.scss']
})
export class TotalSummaryComponent implements OnInit {
  @Input() cart: Cart;
  @Input() checkoutParams: Array<any> = [];
  @Input() cartTotals: CartTotals;

  currentRedirect: string;


  constructor() {
  }

  ngOnInit(): void {
  }
}
