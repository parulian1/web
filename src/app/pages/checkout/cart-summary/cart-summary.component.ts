import { Component, Input, OnInit } from '@angular/core';
import { Cart, ProductCart } from '@app/models/cart';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@app/services';
import { EntityToSlugPipe } from '@app/shared/utils';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  @Input() cart: Cart;

  productModified: Array<ProductCart> = [];

  constructor(private route: ActivatedRoute, private productService: ProductsService, private pipe: EntityToSlugPipe) { }

  ngOnInit(): void {
    this.getCartResolver();
  }

  getCartResolver() {
    this.route.data.subscribe((data: {cart: Cart}) => {
      this.cart.cartItems.forEach((cartItem) => {
        let productPriceLists = [];
        this.productService.fetchProduct(this.pipe.transform(cartItem.product.href)).subscribe((result) => {
          productPriceLists = result.body.priceLists;
        });
        this.productModified.push({
          name: cartItem.product.name,
          href: cartItem.product.href,
          media: cartItem.product.media.filter((media) => {
            return media.type === 'image';
          }),
          vendor: this.pipe.transform(cartItem.product.brand.href),
          priceLists: productPriceLists,
        });
      });
    });
  }
}
