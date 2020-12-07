import {Component, Input, OnInit} from '@angular/core';
import {Logger} from '@app/core';

import {WishlistService} from '@app/services';
import {Product} from '@app/models/wishlist';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

const log = new Logger('AddToWishlistCart');

@Component({
  selector: 'app-add-to-wishlist',
  templateUrl: './add-to-wishlist.component.html',
  styleUrls: ['./add-to-wishlist.component.scss']
})
export class AddToWishlistComponent implements OnInit {
  @Input() products: Product;

  status = false;

  constructor(private service: WishlistService) {}

  ngOnInit(): void {
    this.service.getStatusProductIsWishListed(this.products).subscribe(result => {
      this.status = result['status'] || false;
    });
  }

  addToWishlist() {
    this.service.addProductToWishlist(this.products).subscribe(() => this.status = true);
  }

  removeFromWishlist(): void {
    this.service.deleteProductFromWishlist(this.products).subscribe(() => this.status = false);
  }
}
