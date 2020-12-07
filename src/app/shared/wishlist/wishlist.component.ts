import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CredentialsService } from '@app/core/authentication';
import { ProductItems } from '@app/models/product-lists';
import { WishlistService } from '@app/services/wishlist.service';
import {getSlugFromHref} from "@app/shared/helpers";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  /**
   * Used as indicated that the product already added to list-wishlist or not
   */
  isWishListed = false;

  /**
   * variable that used to combine styling the button
   */
  richButtonStyle: object = {};

  /**
   * The Text, can fill by string (ex: `Tambah Ke Wishlist`) or object (see bottom)
   *
   * `activated` fill it with string to notify that the product want add to list-wishlist (ex: `Tambah ke Wishlist`)
   * `deactivated` fill it with string to notify that the product want to removed from list-wishlist (ex: `Hapus dari Wishlist`)
   */
  @Input() text?: { activated: string, deactivated: string } | any;


  /**
   * Make the button display to Full-Width
   */
  @Input() fullWidth = false;

  /**
   * Icon Only
   *  used as indicate that button only showing the icon (text will be ignore)
   */
  @Input() iconOnly = false;

  /**
   * Size of button, default `normal`
   */
  @Input() size: 'normal' | 'medium' | 'large' = 'normal';

  /**
   * Force redirect when add or delete product to list-wishlist can't accomplish
   */
  @Input() forceRedirect = true;  // force redirect to login page


  /**
   * The product, used to add or delete product from list-wishlist
   */
  @Input() product: ProductItems;

  constructor(
    private wishlistService: WishlistService,
    private router: Router,
    private credentialsService: CredentialsService  // Not pretty need better way
  ) {
  }


  /* Life Cycle */
  ngOnInit() {
    if (this.product) {
      // check product already added to wishlist or not...
      this.getStatusProductIsWishListed(this.product);
    }

    this.richButtonStyle = {
      [`button--shape-round`]: this.iconOnly,
      [`button--size-${this.size}`]: this.size,
      [`button--display-fullwidth`]: this.fullWidth,
    };
  }

  getStatusProductIsWishListed(product: any) {
    if (this.credentialsService.isAuthenticated()) {
      this.wishlistService
      .getStatusProductIsWishListed(product)
      .subscribe(result => {
        this.isWishListed = result['status'] || false;
      });
    }
  }

  /**
   * The method that change status list-wishlist to 'exist' or 'not exist'
   * and do API processing about list-wishlist (add or remove).
   */
  toggleWishList() {
    if (this.isWishListed) {
      this.removeFromWishList();
    } else {
      this.addToWishList();
    }

    // toggle
    this.isWishListed = !this.isWishListed;
  }

  /**
   * add product to list-wishlist
   */
  addToWishList() {
    this.wishlistService.addProductToWishlist(this.product).subscribe(
      data => {
      },
      err => {
        this._errorHandling(err);
      }
    );
  }

  /**
   * remove product from list-wishlist
   */
  removeFromWishList() {
    // todo: create API to handling delete by product
    this.wishlistService.deleteProductFromWishlist(this.product).subscribe(
      data => {
      },
      err => {
        this._errorHandling(err);
      }
    );
  }

  _errorHandling(err: any) {
    if (this._isUnAuthorized(err.status) && this.forceRedirect) {
      // todo: using alias in 'app-routing.module.ts' that its more better
      this.router.navigate(['/login'], {queryParams: {
        redirect: `/products/${getSlugFromHref(this.product.href)}`
        }});
    }
  }

  _isUnAuthorized(status: number): boolean {
    return status === 401;
  }

  get title(): string {
    if (this.isWishListed) {
      return 'Hapus dari Wishlist';
    }
    return 'Simpan di Wishlist';
  }
}
