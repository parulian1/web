import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ProductPagedResponse} from '@app/core/pagination/product-paged-response';
import {SharedConstants} from '@app/shared/shared.constants';
import {
  ProductCategory,
  ProductLists,
  ProductOrdering,
  ProductPriceRange,
  ProductVendor
} from '@app/models/product-lists';
import {ProductPromotion} from '@app/models';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: [`./promotion.component.scss`]
})
export class PromotionComponent implements OnInit {

  promotion: ProductPromotion;

  // sort & filter
  brand = '';
  category = '';
  location: string;
  ordering = 'price';
  priceLte: number;
  priceGte: number;

  brandList: Array<ProductVendor>;
  categoryList: Array<ProductCategory>;
  priceRangeList: Array<ProductPriceRange>;
  orderingList: Array<ProductOrdering>;

  productPagedResponse: ProductPagedResponse<ProductLists>;

  constructor(private route: ActivatedRoute, private title: Title) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { promotion: ProductPromotion }) => {
      this.promotion = data.promotion;
      this.title.setTitle(' ' + this.promotion.name + ' - Martha Tilaar Shop')

    });
  }

  onFiltered($event: any) {
    const param = $event;
    switch (param.filterId) {
      case SharedConstants.FILTER_CATEGORY:
        this.category = param.$event.target.innerText;
        break;
      case SharedConstants.FILTER_BRAND:
        this.brand = param.$event.target.innerText;
        break;
      case SharedConstants.FILTER_LOCATION:
        this.location = param.$event.target.innerText;
        break;
      case SharedConstants.FILTER_PRICE:
        switch (param.$event.target.id) {
          case SharedConstants.UNDER_ONEHUNDRED:
            this.priceLte = 100000;
            this.priceGte = null;
            break;
          case SharedConstants.ONEHUNDRED_AND_TWOHUNDRED:
            this.priceLte = 200000;
            this.priceGte = 100000;
            break;
          case SharedConstants.TWOHUNDRED_AND_THREEHUNDRED:
            this.priceLte = 300000;
            this.priceGte = 201000;
            break;
          case SharedConstants.THREEHUNDRED_AND_FOURHUNDRED:
            this.priceLte = 400000;
            this.priceGte = 301000;
            break;
          case SharedConstants.ABOVE_FOURHUNDRED:
            this.priceLte = null;
            this.priceGte = 401000;
            break;
        }
        break;
    }
    // this.fetchProductLists();
  }

  onSorted($event: any) {
    this.ordering = $event;
  }
}
