import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

import {CredentialsService} from '@app/core/authentication';

import {AddToCartDialogComponent} from '@app/pages/product/add-to-cart-dialog';

import {ProductsService, StoreService} from '@app/services';
import {CartService} from '@app/services/cart.service';

import {ProductDetail} from '@app/models/product-detail';

/**
 * Shows a summary information for a single product.
 */
@Component({
  selector: 'app-product-card',
  template: `
    <ng-container *ngIf="!!product && page !== 'pdp'">
      <app-wishlist
        class="material-icons icon"
        [product]="product"
        [iconOnly]="true">
      </app-wishlist>

      <a [routerLink]="['/products', productHref|entityToSlug]">
        <div class="imgwrap">
          <img [src]="productImageUrl"
               appImgResize
             alt="product"
             (error)="$event.target.src = defaultImageUrl">
        </div>

        <div *ngFor="let tag of tags">{{ tag }}</div>

        <h2
          [ngStyle]="{'font-size': page === 'bdp-mobile'? '14px': '', 'line-height': page === 'bdp-mobile'? '19px': ''}">
          <span title="{{ product?.name }}">{{ product?.name|slice:0:maxTitleLength }}</span>
          <span *ngIf="product?.name.length > maxTitleLength">...</span>
        </h2>
      </a>

      <a [routerLink]="['/brand', product?.vendor?.href|entityToSlug]" class="vendor"
         [ngStyle]="{'font-size': page === 'bdp-mobile'? '12px': ''}">
        {{ product?.vendor?.name }}
      </a>

      <app-product-discount-highlight [product]="product" [page]="page"></app-product-discount-highlight>

    </ng-container>
    <ng-container *ngIf="!!product && page === 'pdp' ">
      <div class="related">
        <div class="left">
          <img [src]="product.media[0].image ? product.media[0].image : 'assets/default-image.png' " appImgResize/>
        </div>
        <div class="right">
          <span class="title">{{product.name}}</span>
          <span class="vendor">{{product.vendor?.name}}</span>
          <app-product-discount-highlight [product]="product"
                                          (priceSelected)="getPriceSelected($event)"></app-product-discount-highlight>
          <button class="btn-cart" (click)="addToCart(product.href, product)">Tambah
            ke Keranjang
          </button>
        </div>
      </div>
    </ng-container>
  `,
  styles: [`
    :host {
      width: 234px;
      height: 324px;
      padding: 8px 16px;
      background: var(--color-white);
      border: 1px solid #E5E5E5;
      box-sizing: border-box;
      border-radius: 4px;
      counter-increment: carousel-cell;
      position: relative;
    }

    :host-context(.related) {
      width: 376px;
      height: 160px;
      display: flex;
      padding: 0;
    }

    .related {
      display: flex;
      height: 100%;
      width: 100%;
    }

    .left {
      width: 160px;
      height: 160px;
    }

    .right {
      display: flex;
      flex-direction: column;
      padding: 16px 16px 16px 0;
    }

    .title {
      font-size: 16px;
      line-height: 22px;
      font-weight: bold;
    }

    .vendor {
      font-size: 14px;
      line-height: 19px;
      color: var(--color-secondary);
    }

    .btn-cart {
      background-color: var(--color-white);
      border: solid 1px var(--color-accent);
      border-radius: var(--border-radius);
      color: var(--color-accent);
      font-size: 16px;
      line-height: 22px;
      font-weight: bold;
      font-style: normal;
      cursor: pointer;
    }

    .imgwrap {
      display: flex;
      height: 160px;
      width: 160px;
      align-self: center;
    }

    app-wishlist {
      position: absolute;
      top: 7px;
      right: 7px;
    }

    app-product-discount-highlight {
      display: block;
    }

    img {
      height: 160px;
      width: 160px;
      object-fit: contain;
      margin: auto;
    }

    h2 {
      height: 44px;
      color: var(--color-primary);
      cursor: pointer;
      font-size: 16px;
      line-height: 22px;
    }

    a {
      text-decoration: none;
      display: flex;
      flex-direction: column;
    }

    .vendor {
      cursor: pointer;
      font-family: var(--font-primary) sans-serif;
      font-size: 14px;
      line-height: 19px;
      color: var(--color-secondary);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .product-tag {
      font-family: var(--font-primary) sans-serif;
      font-size: 12px;
      line-height: 14px;
      color: var(--color-white);

      position: absolute;
      top: 156px;
      background-color: #53A0D7;
      padding: 5px 14px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    @media screen and (max-width: 500px) {
      :host {
        height: auto;
      }

      .imgwrap {
        height: 120px;
      }

      img {
        max-height: 120px;
        max-width: 120px;
      }

      h2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-bottom: 0;
      }
    }
  `]
})
export class ProductCardComponent implements OnInit {

  readonly defaultImageUrl = 'assets/default-image.png';
  readonly maxTitleLength = 25;

  @Input() productHref: string;
  @Input() page: string;
  product: ProductDetail;
  defaultQty = 1;
  priceSelected: number;

  constructor(protected productService: ProductsService,
              private storeService: StoreService,
              private credentialsService: CredentialsService,
              private cartService: CartService,
              public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {

    this.productService.fetchProductByHref(this.productHref).subscribe(
      product => this.product = product)
  }

  get productImageUrl(): string {
    const images = this.product?.media.filter(m => m.type === 'image') ?? [];
    return (!!images.length) ? images[0].image : this.defaultImageUrl;
  }

  get tags(): string[] {
    return [];
  }

  get minPrice(): number {
    return this.product?.priceLists[0].ranges.slice(-1)[0]?.price ?? 0;
  }

  get maxPrice(): number {
    return this.product?.priceLists[0].ranges[0]?.price ?? 0;
  }

  addToCart(product: string, products: ProductDetail) {
    const total = this.defaultQty * this.priceSelected;
    const currentWarehouse = this.storeService.preferredStore;


    const payload = {
      product,
      products,
      quantity: 1,
      warehouse: currentWarehouse.href,
      total,
      price: this.priceSelected,
      warehouseName: currentWarehouse.name,
      message: '',
      status: 0
    };


    if (this.credentialsService.isAuthenticated()) {
      this.cartService.addToCart(payload).subscribe(resp => {
          if (resp.status === 201) {
            payload.status = resp.status;
            this.dialog.open(AddToCartDialogComponent, {
              data: payload,
              width: '464px',
              height: '363px'
            });
          }

        },
        error => {
          payload.message = error.error.message;
          payload.status = error.status;
          this.dialog.open(AddToCartDialogComponent, {
            data: payload,
            width: '464px',
            height: '363px'
          });
        });

    } else {
      this.router.navigateByUrl('/login');
    }


  }

  getPriceSelected($event: any) {
    this.priceSelected = $event;
  }
}
