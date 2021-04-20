import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigService, Logger } from '@app/core';
import { MatDialog } from '@angular/material/dialog';

import { Cart, CartTotals, LineItems, MatchedPriceRanges, ProductCart } from '@app/models/cart';
import { CartService, LocalStorage, ProductsService } from '@app/services';
import { DeleteCartDialogComponent } from '@app/pages/cart/delete-cart-dialog';
import { PriceLists } from '@app/models/product-detail';
import { Title } from '@angular/platform-browser';
import { Configuration } from '@app/models';
import { EntityToSlugPipe } from '@app/shared/utils';


const log = new Logger('Cart');

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})


export class CartComponent implements OnInit {
  cart: Cart;
  cartTotals: CartTotals;
  cartItems: LineItems[] = [];
  productModified: Array<ProductCart> = [];
  warehouse: any = [];
  discountProduct: Array<{ product: string, discount: number, priceLists?: Array<PriceLists>, warehouse?: string }> = [];

  productCount = 0;
  itemCount = 0;
  cartCount = 0;
  page = 'cart';
  priceInfo = [];
  productsImage = [];
  config: Configuration;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private localStorage: LocalStorage,
              public dialog: MatDialog,
              public title: Title,
              private appConfigService: ConfigService,
              public cartService: CartService,
              public productService: ProductsService,
              public pipe: EntityToSlugPipe) {
  }

  ngOnInit(): void {
    this.config = this.appConfigService.config;
    let title = 'Nusantara Platform';
    if (!!this.config?.name) {
      title = this.config.name.substr(0, 1).toUpperCase() + this.config.name.substr(1);
    }
    this.route.data.subscribe((data: { cart: Cart }) => {
      this.localStorage.removeItem('cart-quantity');
      this.cart = data.cart;
      this.cartItems = data.cart.cartItems;
      this.warehouse = this.cart.weight;
      this.itemCount = 0;
      this.productCount = this.cart.cartItems.length;
      this.cartTotals = this.cart.cartTotals;
      this.cart.cartItems.map((cartItem) => {
        cartItem.matchedPriceRanges = [];
        this.itemCount += cartItem.quantity;
        const existingProduct = this.productModified.find((_product) => {
          return _product.href === cartItem.product.href;
        });
        if (!existingProduct) {
          this.productModified.push({
            name: cartItem.product.name,
            href: cartItem.product.href,
            media: cartItem.product.media.filter((media) => { return media.type === 'image'; }),
            vendor: this.pipe.transform(cartItem.product.brand.href),
            priceLists: [],
          });
        }
      });
      this.localStorage.setItem('cart-quantity', this.itemCount);
      this.cartCount = this.localStorage.getItem('cart-quantity');

      this.setDiscountPrice();
      this.setPriceInfo();
      this.setProductImage(this.cartItems, this.productModified);
    });

    this.title.setTitle(`Shopping Cart - ${ title }`);
  }

  removeCartItem(line: LineItems) {
    this.dialog.open(DeleteCartDialogComponent, {
      data: line,
      width: '464px',
      height: '363px'
    });
  }

  setDiscountPrice() {
    this.discountProduct = [];

    for (const items of this.cart.cartItems) {
      if (items.discount.length > 0) {
        // theres discount in it
        const currentPrice = items.product.unitPrice.current;
        const regularPrice = items.product.unitPrice.regular;

        const discount = Math.round(((regularPrice - currentPrice) / regularPrice) * 100);
        this.discountProduct.push({product: items.product.href, discount, warehouse: items.warehouse.name});
      }
    }
  }

  setPriceInfo() {
    this.priceInfo = [];
    this.productModified.map((product) => {
      product.priceLists = [];
      this.productService.fetchProduct(this.pipe.transform(product.href)).subscribe((result) => {
          const productHref = product.href;
          const defaultPriceLists = result.body.priceLists.filter((priceList) => {
            return priceList.ranges.length > 1 && priceList.type === 'default';
          });
          const filteredPriceLists = defaultPriceLists ? defaultPriceLists[0] : null;
          if (!!filteredPriceLists) {
            product.priceLists.push(filteredPriceLists);
            const filteredPriceRanges = filteredPriceLists.ranges;
            if (!!filteredPriceRanges) {
              for (const price of filteredPriceRanges) {
                const minQty = price.minQuantity;
                const maxQty = price.maxQuantity;
                const priceBase = price.price;
                let priceDiscount = 0;
                if (price.activePromotionalPrices.length !== 0) {
                  priceDiscount = price.activePromotionalPrices[0]?.netPrice || 0;
                }
                const info = {
                  minQty,
                  maxQty,
                  priceBase,
                  priceDiscount,
                  productHref
                };
                this.priceInfo.push(info);
              }
            }
            if (filteredPriceLists.isProgressive) {
              this.cart.cartItems.filter((cartItem) => {
                return cartItem.product.href === product.href;
              }).map((_cartItem) => {
                let prevMaxRangeQty = 0;
                filteredPriceRanges.forEach((priceRange) => {
                  let _price: MatchedPriceRanges = Object.assign({}, priceRange);
                  const itemQtyEqGtMin = _cartItem.quantity >= priceRange.minQuantity;
                  const itemQtyEqLtMax = _cartItem.quantity <= priceRange.maxQuantity;
                  const itemQtyGtMax = _cartItem.quantity > priceRange.maxQuantity;

                  if (itemQtyEqGtMin && (itemQtyEqLtMax || itemQtyGtMax)) {
                    if (!!priceRange.maxQuantity) {
                      _price.calculatedQty = priceRange.maxQuantity - prevMaxRangeQty;
                    } else {
                      _price.calculatedQty = _cartItem.quantity - prevMaxRangeQty;
                      _price.maxQuantity = _cartItem.quantity;
                    }
                    if (!!priceRange.maxQuantity && itemQtyEqLtMax) {
                      _price.maxQuantity = _cartItem.quantity;
                      _price.calculatedQty = _cartItem.quantity - prevMaxRangeQty;
                    }
                    if (_cartItem.quantity === _price.minQuantity || _price.minQuantity === _price.maxQuantity) {
                      _price.maxQuantity = null;
                    }
                    _cartItem.matchedPriceRanges.push(_price);
                    prevMaxRangeQty = priceRange.maxQuantity;
                  }
                });
              });
            }
          }
      });
    });
  }

  setProductImage(cartItems: LineItems[], productModified: Array<ProductCart>) {
    this.productsImage = [];

    for (const item of cartItems) {
      const href = item.product.href;
      const media = productModified.filter(t => t.href === href).map(m => m.media);

      this.productsImage.push({href, media});

      if (this.productsImage) {
        this.productsImage = this.productsImage.filter((value, index, array) => array.indexOf(value) === index);
      }
    }
  }

  setImage(href: Array<ProductCart>, s: string) {
    return href.filter(m => m.href === s)[0].media[0].image;
  }

  isValidCart(): boolean {
    if (!!this.cartItems && this.cartItems.length > 0) {
      return this.cartItems.filter((cartItem) => {
        return cartItem.isInStock;
      }).length === this.cartItems.length;
    } else {
      return false;
    }
  }

  continueCheckoutAction() {
    if (this.isValidCart()) {
      this.router.navigate(['/checkout']);
    }
  }

  voucherApplied(event: boolean) {
    this.cartService.fetchCart().subscribe(resp => {
      this.localStorage.removeItem('cart-quantity');
      this.cart = resp.body;
      this.cartItems = this.cart.cartItems;
      this.warehouse = this.cart.weight;
      this.itemCount = 0;
      for (const item of this.cart.cartItems) {
        this.itemCount += item.quantity;
      }
      this.localStorage.setItem('cart-quantity', this.itemCount);
      this.cartCount = this.localStorage.getItem('cart-quantity');
      this.productCount = this.cart.cartItems.length;
      this.cartTotals = this.cart.cartTotals;

      this.setDiscountPrice();
      this.setPriceInfo();
      this.setProductImage(this.cartItems, this.productModified);
    })
  }
}
