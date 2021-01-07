import { Component, Input, OnInit } from '@angular/core';
import { ProductDetail } from '@app/models/product-detail';
import { ResellerCatalogService } from '@app/services';
import { Router } from "@angular/router";
import { getSlugFromHref } from "@app/shared/helpers";
import { ResellerCatalogItem } from "@app/models";
import { Store } from "@app/models/store";
import { Logger } from "@app/core";

const log = new Logger('ResellerCatalogButton');


@Component({
  selector: 'app-reseller-catalog-button',
  template: `
    <button
      (click)="addToResellerCatalog()"
      [attr.disabled]="isProductInResellerCatalog ? true : null"
      type="button"
      class="btn-fill-accent">
      <span *ngIf="!isProductInResellerCatalog">Tambah ke Katalog Reseller</span>
      <span *ngIf="isProductInResellerCatalog">Sudah berada di Katalog Reseller</span>
    </button>
  `,
  styles: [`
    button {
      width: 100%;
    }
  `],
})
export class ResellerCatalogButtonComponent implements OnInit {

  @Input() productDetail: ProductDetail;
  @Input() quantity: number;
  @Input() warehouse: Store;

  isProductInResellerCatalog = false;

  catalogItems: ResellerCatalogItem[] = [];

  constructor(private resellerCatalogService: ResellerCatalogService, private router: Router) {
  }

  ngOnInit(): void {
    this.retrieveCatalog();
  }

  /**
   * Adds the currently displayed product to the reseller's catalog.
   */
  addToResellerCatalog() {
    if (!this.isProductInResellerCatalog && !!this.productDetail) {
      let price = this.findPriceDefault(this.productDetail);
      const payload = {
        product: this.productDetail.href,
        quantity: this.quantity,
        warehouse: this.warehouse.href,
        price: price
      };
      this.resellerCatalogService.addToCatalog(payload).subscribe(resp => {
          if (resp.status === 201) {
            this.setIsProductInResellerCatalog(true);
          }
        },
        error => {
          log.debug(`Failed ${error.error.message}`);
        });
    }
  }

  findPriceDefault(productDetail: ProductDetail) {
    if (!!productDetail.priceLists) {
      let foundPriceInfo = productDetail.priceLists.filter((priceInfo) => {
        return priceInfo.type === 'default';
      });
      let priceInfo = productDetail.priceLists[0].ranges[0];

      if (!!foundPriceInfo) {
        priceInfo = foundPriceInfo[0].ranges.sort((rangeOne, rangeTwo) => {
          return rangeOne.minQuantity - rangeTwo.minQuantity;
        })[0];
      }
      return priceInfo.price;
    }
    return 0;
  }

  private retrieveCatalog(): void {
    this.resellerCatalogService.fetchCatalogItems(getSlugFromHref(this.productDetail.href)).subscribe((resp) => {
      this.catalogItems = resp.entities;
      this.setIsProductInResellerCatalog(this.isInResellerCatalog());
    });
  }

  /**
   * Indicates whether the currently-displayed product is already
   * saved in the current user's reseller catalog.
   */
  private isInResellerCatalog(): boolean {
    return this.catalogItems.filter((entity) => {
      return entity.product.href === this.productDetail.href || entity.product.upc === this.productDetail.upc;
    }).length > 0
  }

  private setIsProductInResellerCatalog(isFound: boolean): void {
    this.isProductInResellerCatalog = isFound;
  }

}
