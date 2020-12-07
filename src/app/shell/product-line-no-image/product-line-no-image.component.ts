import { Component, Input } from '@angular/core';

import { HighlightList } from '@app/models/highlight';

/**
 * Shows a horizontally-scrollable collection of products.
 */
@Component({
  selector: 'app-product-line-no-image',
  template: `
    <div class="highlight-title">{{highlight.name|titlecase}}</div>
    <div class="product-line-container">
      <div class="product-line-item">
        <ngx-slick-carousel [config]="slidesConfig">
          <app-product-card
            ngxSlickItem
            *ngFor="let productHighlight of highlight.productHighlights"
            class="carousel-cell"
            [productHref]="productHighlight.href">
          </app-product-card>
        </ngx-slick-carousel>
      </div>
    </div>
  `,
  styleUrls: ['./product-line-no-image.component.scss']
})
export class ProductLineNoImageComponent {

  @Input() highlight: HighlightList;

  slidesConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    variableWidth: true,
    nextArrow: `
      <button class="slick-next">
        <span class="material-icons">keyboard_arrow_right</span>
      </button>`,
    prevArrow: `
      <button class="slick-prev">
        <span class="material-icons">keyboard_arrow_left</span>
      </button>`,
  };

  constructor() { }

  getDefaultImageProduct(event: any) {
    event.target.src = 'assets/default-image.png';
  }
}
