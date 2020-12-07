import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {PriceRanges, ProductDetail, PromotionalPrice,} from '@app/models/product-detail';

/**
 * Shows a summary information for a single product.
 */
@Component({
  selector: 'app-product-discount-highlight',
  template: `
    <div class="base-price" [ngStyle]="{'font-size': page === 'bdp-mobile'? '10px': ''}">
      <ng-container *ngIf="!!displayedPromo">
        <div class="base-price-range">
          <span>{{ baseStartingPrice|currency:'Rp ':'symbol':'1.0' }}</span>
          <span
            *ngIf="baseStartingPrice !== baseEndingPrice"> - {{ baseEndingPrice|currency:'Rp ':'symbol':'1.0' }}</span>
        </div>
        <span *ngIf="displayedPromo" class="promo-pct">{{ displayedPromo }}%</span>
      </ng-container>
    </div>

    <ng-container *ngIf="page !== 'cart';else elsePrice">
      <div class="price"
           [ngStyle]="{'font-size': page === 'bdp-mobile'? '14px': '', 'line-height': page === 'bdp-mobile'? '19px': ''}">
        <span>{{ currentStartingPrice|currency:'Rp ':'symbol':'1.0' }}</span>
        <span
          *ngIf="currentEndingPrice !== currentStartingPrice"> - {{ currentEndingPrice|currency:'Rp ':'symbol':'1.0' }}</span>
      </div>
    </ng-container>

    <ng-template #elsePrice>
      <div class="price-else">
        <span>{{ currentStartingPrice|currency:'Rp ':'symbol':'1.0' }}</span>
        <span
          *ngIf="currentEndingPrice !== currentStartingPrice"> - {{ currentEndingPrice|currency:'Rp ':'symbol':'1.0' }}</span>
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
      height: 40px;
    }

    .base-price {
      font-family: var(--font-primary) sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      color: var(--color-secondary);
      display: flex;
      align-items: center;
    }

    .base-price-range {
      text-decoration-line: line-through;
    }

    .price {
      color: var(--color-accent);
      font-family: var(--font-primary) sans-serif;
      font-size: 16px;
      line-height: 22px;
    }

    .price-else {
      color: var(--color-primary);
      font-family: var(--font-primary) sans-serif;
      font-size: 14px;
      line-height: 18px;
      font-weight: bold;
      margin-top: 3px;
    }

    .promo-pct {
      padding: 2px 4px;
      background: #FFEAED;
      border-radius: 4px;
      margin: 0 0 0 4px;
      border: solid 1px var(--color-accent);
      color: var(--color-accent);
    }
  `]
})
export class ProductDiscountHighlightComponent implements OnInit {

  @Input() product: ProductDetail;
  @Input() page: string;

  @Output() priceSelected = new EventEmitter<any>();

  startingListRange: PriceRanges;
  endingListRange: PriceRanges;

  startBasePrice = null;
  endBasePrice = null;

  startCurrentPrice = null;
  endCurrentPrice = null;

  ngOnInit() {
    const firstPriceRange = this.product?.priceLists[0];
    if (firstPriceRange) {
      this.startingListRange = this.product?.priceLists[0].ranges[0];
      this.endingListRange = this.product?.priceLists[0].ranges.slice(-1)[0];
    } else {
      this.startingListRange = null;
      this.endingListRange = null;
    }

    /**
     * Set price display from low to high
     */
    if (this.startingListRange && this.endingListRange) {
      this.setDisplayPrice();
    }

  }

  get baseStartingPrice(): number {
    if (this.startBasePrice) {
      return this.startBasePrice;
    } else {
      return this.startingListRange?.price ?? 0;
    }
  }

  get baseEndingPrice(): number {
    if (this.endBasePrice) {
      return this.endBasePrice;
    } else {
      return this.endingListRange?.price ?? 0;
    }
  }

  get currentStartingPrice(): number {

    if (!this.startingListRange) {
      return 0;
    }

    if (this.startingListRange.activePromotionalPrices.length) {
      if (this.startCurrentPrice) {
        return this.startCurrentPrice;
      }
      return this.startingListRange.activePromotionalPrices[0][0].netPrice;
    }

    this.priceSelected.emit(this.baseStartingPrice);
    return this.baseStartingPrice;
  }

  get currentEndingPrice(): number {

    if (!this.endingListRange) {
      return 0;
    }

    if (this.endingListRange.activePromotionalPrices.length) {
      if (this.endCurrentPrice) {
        return this.endCurrentPrice;
      }
      return this.endingListRange.activePromotionalPrices[0][0].netPrice;
    }
    return this.baseEndingPrice;
  }

  get displayedPromo(): PromotionalPrice | number {

    if (!this.startingListRange) {
      return null;
    }

    if (this.startingListRange.activePromotionalPrices.length) {
      const promo = this.startingListRange.activePromotionalPrices[0][0];

      if (promo.type === 'percentage') {
        return promo.amount;
      } else {
        const basePrice = promo.amount + promo.netPrice;
        const discountPrice = (promo.amount / basePrice) * 100;

        return Math.round(discountPrice);
      }
    }
    return null;
  }

  setDisplayPrice() {
    const tempStartingPrice = this.baseStartingPrice;
    const tempEndingPrice = this.baseEndingPrice;

    const tempStartingCurrentPrice = this.currentStartingPrice;
    const tempEndingCurrentPrice = this.currentEndingPrice;

    if (tempStartingPrice > tempEndingPrice) {
      this.startBasePrice = tempEndingPrice;
      this.endBasePrice = tempStartingPrice;
    }

    if (tempStartingCurrentPrice > tempEndingCurrentPrice) {
      this.startCurrentPrice = tempEndingCurrentPrice;
      this.endCurrentPrice = tempStartingCurrentPrice;
    }

  }
}
