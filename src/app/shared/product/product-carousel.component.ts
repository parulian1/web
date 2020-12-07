import {Component, DoCheck, Input, OnInit} from '@angular/core';

import {HighlightList} from '@app/models/highlight';

/**
 * Shows a horizontally-scrollable collection of products.
 */
@Component({
  selector: 'app-product-carousel',
  template: `

    <h2 style="width: 100%">{{highlight.name|titlecase}}</h2>

    <div class="product-line-container">
      <div class="product-line-item">
        <ngx-slick-carousel [config]="slidesConfig"
                            class="ngx-slick-carousel">
          <app-product-card
            ngxSlickItem
            *ngFor="let productHighlight of highlight.productHighlights"
            class="carousel-cell"
            [productHref]="productHighlight.href"
            [page]="mobile === true ? 'home-mobile' : 'null' ">
          </app-product-card>
        </ngx-slick-carousel>
      </div>
    </div>
  `,
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit, DoCheck {

  @Input() highlight: HighlightList;
  mobile = false;

  slidesConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    variableWidth: true,
    nextArrow: `
      <button class="slick-next">
        <span class="material-icons">keyboard_arrow_right</span>
      </button>`,
    prevArrow: `
      <button class="slick-prev">
        <span class="material-icons">keyboard_arrow_left</span>
      </button>`,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  constructor() {
  }

  ngOnInit() {
    this.detectScreenSize();
  }

  getDefaultImageProduct(event: any) {
    event.target.src = 'assets/default-image.png';
  }

  detectScreenSize() {
    this.mobile = window.screen.width <= 500;
  }

  ngDoCheck(): void {
    this.detectScreenSize();
  }

}
