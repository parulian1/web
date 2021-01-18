import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '@app/services/products.service';
import {
  PriceRanges,
  ProductAttributes,
  ProductClass,
  ProductDetail,
  ProductDetailMedia,
  PromotionalPrice
} from '@app/models/product-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '@app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartDialogComponent } from '@app/pages/product/add-to-cart-dialog/add-to-cart-dialog.component';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@app/models/store/store';
import { LocalStorage } from '@app/services/local-storage.service';
import { StoreService } from '@app/services';
import { WarehouseDialogComponent } from '@app/pages/product-detail/warehouse-dialog/warehouse-dialog.component';
import { CredentialsService } from '@app/core/authentication';
import { EntityToSlugPipe } from '@app/shared/utils/entity-to-slug.pipe';
import { ConfigService, Logger } from '@app/core';
import { Configuration, RatingSummary, Review } from '@app/models';
import { animate, state, style, transition, trigger } from "@angular/animations";
import {Meta, Title} from "@angular/platform-browser";
import { StoreWithStock } from "@app/models/store";
import {GtagService} from '@app/library/gtagjs/gtag.service';

const log = new Logger('VariantsResolver');

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        display: 'flex'
      })),
      state('closed', style({
        display: 'none',
      })),
      transition('open => closed', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ]),
      transition('closed => open', [
        animate(300, style({ transform: 'translateX(-100%)' }))
      ]),
    ]),
  ],
})
export class ProductDetailComponent implements OnInit, DoCheck {
  @ViewChild('quantity', {static: true})
  public quantity: ElementRef;

  featuredImage: string;
  productDetail: ProductDetail;
  listWarehouses: Store[] = [];
  products: any;
  defaultQty: number = 1;
  disabled: boolean = false;
  warehouseName: string;
  video: Array<ProductDetailMedia>;
  priceSelected: number;
  priceBase: number;
  priceLists: Array<PriceRanges>;
  currentWarehouse: StoreWithStock;
  productAttribute: ProductAttributes[];
  slideProductImg: Array<ProductDetailMedia> = [];
  slideProductImg2: Array<ProductDetailMedia> = [];
  productClass: ProductClass[];
  variants: any;
  page: string = 'pdp';
  priceInfo: Array<any> = [];
  review: Review[];
  ratingSummary: RatingSummary;
  startingListRange: PriceRanges;
  endingListRange: PriceRanges;
  isOpen: boolean = false;

  richTextAttributes: Array<{ meta: ProductAttributes, value: string }> = [];

  slideConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'asNavFor': '.carousel-bottom',
    'fade': true,
  };

  slideConfig2 = {
    'slidesToShow': 3,
    'slidesToScroll': 1,
    'asNavFor': '.carousel-top',
    'focusOnSelect': true,
    'arrows': true,
    'nextArrow': '<button class="slick-next"><span class="material-icons">\n' +
      'keyboard_arrow_right\n' +
      '</span></button>',
    'prevArrow': '<button class="slick-prev"><span class="material-icons">\n' +
      'keyboard_arrow_left\n' +
      '</span></button>',
    'variableWidth': true,
  };
  mobileMenu: string;

  config: Configuration;

  constructor(private productsService: ProductsService,
              private cartService: CartService,
              private el: ElementRef,
              private route: ActivatedRoute,
              public router: Router,
              public dialog: MatDialog,
              private storeService: StoreService,
              private credentialsService: CredentialsService,
              private localStorage: LocalStorage,
              private pipe: EntityToSlugPipe,
              private title: Title,
              private appConfigService: ConfigService,
              private meta: Meta,
              private gtag: GtagService) {
  }

  ngOnInit(): void {
    this.config = this.appConfigService.config;
    let title = "Nusantara Platform";
    if (!!this.config?.name) {
      title = this.config.name.substr(0, 1).toUpperCase() + this.config.name.substr(1);
    }
    if (this.localStorage.getItem('attributes')) {
      this.localStorage.removeItem('attributes');
    }

    this.route.data.subscribe((data: {
        product: ProductDetail,
        warehouse: Array<Store>,
        attribute: ProductAttributes[],
        variants: any,
        review: Review[],
        stock: any,
        rating: RatingSummary
      }) => {
        this.variants = data.variants;
        this.productDetail = data.product;
        this.review = data.review;
        this.ratingSummary = data.rating;
        this.storeService.getAvailableStock(this.productDetail.href).subscribe( resp => {
          log.info(resp);
          this.listWarehouses = resp;

          let foundWarehouseFromPreferred = this.listWarehouses.filter( warehouse => {
            return warehouse.href === this.storeService.preferredStore.href;
          });
          if (foundWarehouseFromPreferred.length > 0) {
            this.currentWarehouse = foundWarehouseFromPreferred[0];
          } else {
            this.currentWarehouse = this.listWarehouses[0];
          }
        });
        if (!!this.currentWarehouse && this.defaultQty > this.currentWarehouse.quantity ) {
          this.defaultQty = this.currentWarehouse.quantity;
        }
        this.productAttribute = data.attribute.filter(attr => attr.type !== 'markdown');
        const possibleValues = [];
        for (const attr of this.productAttribute) {
          // standard attribute that will be displayed @ right-side of screeen
          possibleValues.push({type: attr.type, value: this.productDetail.attributes[attr.href]});
          const childAttr = this.productDetail.variants.map(v => v.attributes[attr.href]);
          possibleValues.push({type: attr.type, value: childAttr[0]});
        }
        const uniquePossibleValues = [...new Set([possibleValues, possibleValues])];

        this.richTextAttributes = data.attribute.filter(
          attr => attr.type === 'markdown' && !!this.productDetail.attributes[attr.href]
        ).map(
          attr => ({meta: attr, value: this.productDetail.attributes[attr.href]})
        );

        this.slideProductImg = data.product.media.filter(m => m.type === 'image');
        this.video = data.product.media.filter(m => m.type === 'you_tube');
        if (data.product.priceLists.length !== 0) {
          this.priceLists = data.product.priceLists[0].ranges;
        }

        this.setPriceTag(data.product);
        this.setPriceInformation(this.priceLists);

        this.title.setTitle(this.productDetail.name + ` - ${ title }`);

        this.trackAnalyticView(this.productDetail);
      }
    );
    this.slideProductImg2 = this.slideProductImg;

    this.setSeo();
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

  decrease() {
    if (this.defaultQty > 1) {
      return this.defaultQty--;
    }
    return this.defaultQty;
  }

  increase() {
    let isValidToIncrease = (!!this.currentWarehouse && !!this.currentWarehouse.quantity &&
      this.defaultQty < this.currentWarehouse.quantity);
    if (isValidToIncrease) {
      return this.defaultQty++;
    }
    return this.defaultQty;
  }

  ngDoCheck(): void {
    if (this.priceLists) {
      for (const price of this.priceLists) {
        if (price.maxQuantity) {

          if (this.defaultQty <= price.maxQuantity && this.defaultQty >= price.minQuantity) {

            if (price.activePromotionalPrices.length) {
              this.priceBase = price.price;
              this.priceSelected = price.activePromotionalPrices[0][0].netPrice;
            } else {
              this.priceSelected = price.price;
            }

            break;
          }
        } else if (price.maxQuantity === null) {

          if (this.defaultQty >= price.minQuantity) {
            if (price.activePromotionalPrices.length) {
              this.priceBase = price.price;
              this.priceSelected = price.activePromotionalPrices[0][0].netPrice;
            } else {
              this.priceSelected = price.price;
            }

            break;
          }
        }
      }
    }
  }

  addToCart(product: string, products: ProductDetail) {
    this.disabled = true;
    const total = this.defaultQty * this.priceSelected;

    const payload = {
      product,
      products,
      quantity: this.defaultQty,
      warehouse: this.currentWarehouse.href,
      total,
      price: this.priceSelected,
      warehouseName: this.warehouseName,
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
           this.cartService.fetchCart().subscribe(cart => {
             const _cartItems = cart.body.cartItems;
             let _itemCount = 0;
             for (const _cartItem  of _cartItems) {
               _itemCount += _cartItem.quantity;
             }
             this.localStorage.setItem('cart-quantity', _itemCount);
           });

           this.trackAnalyticCart(products, this.priceSelected, this.defaultQty);
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

    this.disabled = false;

  }


  getWarehouseName($event: MatSelectChange, listWarehouses: Array<Store>) {
    for (const item of listWarehouses) {
      if ($event.value === item.href) {
        this.warehouseName = item.name;
      }
    }
  }

  selectWarehouse() {
    const dialog = this.dialog.open(WarehouseDialogComponent, {
      data: this.listWarehouses,
    });

    dialog.afterClosed().subscribe(result => {

    });
  }

  redirectAttr(hrefProduct: string) {
    this.router.navigateByUrl(`/products/${this.pipe.transform(hrefProduct)}`);
  }

  setPriceTag(product: ProductDetail) {
    const firstPriceRange = product?.priceLists[0];
    if (firstPriceRange) {
      this.startingListRange = product?.priceLists[0].ranges[0];
      this.endingListRange = product?.priceLists[0].ranges.slice(-1)[0];
    } else {
      this.startingListRange = null;
      this.endingListRange = null;
    }
  }

  toogleSideMobile() {
    this.isOpen = !this.isOpen;
  }

  setPriceInformation(priceLists: Array<PriceRanges>) {
    this.priceInfo = [];
    for (const price of priceLists) {
      const minQty = price.minQuantity;
      const maxQty = price.maxQuantity;
      const priceBase = price.price;
      let priceDiscount = 0;

      if (price.activePromotionalPrices.length !== 0) {
        priceDiscount = price.activePromotionalPrices[0][0].netPrice;
      }

      const info = {
        minQty,
        maxQty,
        priceBase,
        priceDiscount
      };

      this.priceInfo.push(info);
    }
  }

  popUpVideo($event: MouseEvent) {

  }

  playerReady($event: YT.Player) {

  }

  onStateChange($event: YT.PlayerEvent) {

  }

  getVideoThumbnail(video: Array<ProductDetailMedia>) {

    if (video) {
      for (const item of video) {
        if (item.youtubeVideoId) {
          const thumbnail = `http://img.youtube.com/vi/${item.youtubeVideoId}/default.jpg`;

        }
      }
    }
  }

  getShowReseller() {
    if (!this.currentWarehouse || !this.credentialsService.isAuthenticated() || !this.credentialsService.getIsReseller()) {
      return false;
    }
    return true;
  }

  setSeo() {
    let seoContentKeyword = '';
    if (!!this.productDetail?.seoMeta) {
      seoContentKeyword = this.productDetail.seoMeta;
    }
    if (!!this.config?.extraConfig?.keywords) {
      seoContentKeyword += ` ${this.config.extraConfig.keywords}`;
    }
    let seoContentDescription = '';
    if (!!this.productDetail?.seoDescription) {
      seoContentDescription += ` ${this.productDetail.seoDescription}`;
    }
    if (!!this.config?.extraConfig?.description) {
      seoContentDescription += ` ${this.config.extraConfig.description}`;
    }
    this.meta.addTag({
      name: 'description',
      content: seoContentDescription
    });
    this.meta.addTag({
      name: 'keywords',
      content: seoContentKeyword
    });
  }

  private trackAnalyticCart(product: ProductDetail, price: number, qty: number = 1) {
   this.gtag.addToCart({
     items: [{
       id: product.href,
       name: product.name,
       brand: product.vendor?.name || '',
       quantity: qty,
       price,
     }]
   })
  }

  private trackAnalyticView(product: ProductDetail) {
    this.gtag.viewItem([{
        id: product.href,
        name: product.name,
        brand: product.vendor?.name || '',
      }]
    )
  }

}
