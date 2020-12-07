import {Component, Input, OnInit} from '@angular/core';
import {Cart, CartModified, ProductCart} from '@app/models/cart';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  @Input() cart: Cart;

  productModified: Array<ProductCart>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCartResolver();
  }

  getCartResolver() {
    this.route.data.subscribe((data: {cart: CartModified}) => {
      this.productModified = data.cart[0].product;
    });
  }
}
