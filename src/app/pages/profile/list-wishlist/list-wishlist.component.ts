import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { MatDialog } from "@angular/material/dialog";

import { StoreService } from "@app/services";
import { CartService } from "@app/services/cart.service";
import { WishlistService } from "@app/services/wishlist.service";
import { CredentialsService } from "@app/core/authentication";

import { Wishlist, Product } from "@app/models/wishlist";

import { WishlistSelectWarehouseComponent } from "./containers";
import { WishlistPagedResponse } from "./utils/wishlist-paged-response";
import { AddToCartDialogComponent } from "@app/pages/product/add-to-cart-dialog/add-to-cart-dialog.component";

@Component({
  selector: "app-wishlist",
  templateUrl: "./list-wishlist.component.html",
  styleUrls: ["./list-wishlist.component.scss"],
})
export class ListWishlistComponent implements OnInit {
  page: WishlistPagedResponse;
  wishlists: Wishlist[] = [];
  entities: Wishlist[];

  // filtering
  paginate: number = 1;
  search: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cartService: CartService,
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private wishlistService: WishlistService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (result: { page: any }) => {
        this.page = new WishlistPagedResponse(result.page);
        this.wishlists = this.page.entities;
        this.entities = this.page.entities;
      },
      (error) => this._handleError(error)
    );
  }

  removeProduct(product: Product) {
    this.wishlistService.deleteProductFromWishlist(product).subscribe(() => {
      this.refreshPage();
    });
  }

  addToCart(wishlist: Wishlist) {
    const { product } = wishlist;
    const basePrice = product.unitPrice ? product.unitPrice.regular || product.unitPrice.current : 0;
    const total = 1 * basePrice;

    const payload = {
      product: product.href,
      products: product,
      quantity: 1,
      warehouse: wishlist.selectedWarehouse.href,
      total,
      price: basePrice,
      warehouseName: wishlist.selectedWarehouse.name,
      status: 201,
      message: "",
    };

    if (this.credentialsService.isAuthenticated()) {
      if (wishlist.warehouses.length > 0) {
        this.cartService.addToCart(payload).subscribe(
          (resp) => {
            if (resp.status === 201) {
              // delete and refetch list of wishlists
              this.wishlistService.deleteProductFromWishlist(wishlist.product).subscribe(() => {
                this._fetchWishlist(true);
                payload.status = resp.status;
                this.dialog.open(AddToCartDialogComponent, {
                  data: payload,
                  width: "464px",
                  height: "363px",
                });
              });
            }
          },
          (error) => {
            payload.message = error.error.message;
            payload.status = error.status;
            this.dialog.open(AddToCartDialogComponent, {
              data: payload,
              width: "464px",
              height: "363px",
            });
          }
        );
      }
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  selectWarehouse(wishlist: Wishlist): void {
    const selected = this.dialog.open(WishlistSelectWarehouseComponent, {
      data: wishlist.warehouses,
      width: "464px",
    });

    selected.afterClosed().subscribe((result) => {
      if (result) {
        wishlist.selectedWarehouse = result;
      }
    });
  }

  doSearch(term: string): void {
    this.search = term;
    this._fetchWishlist(true);
  }
  doPaginate(term: number): void {
    this.paginate = term;
    this._fetchWishlist(true);
  }

  _fetchWishlist(setQueries: boolean = false) {
    const queries = { q: this.search || "", page: this.paginate };
    this.wishlistService.fetchListWishlistWithWarehouses(queries).subscribe(
      (wishlists) => {
        this.wishlists = [];
        this.wishlists = wishlists.data;

        if (setQueries) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { order_query: this.search || "", page: this.paginate },
            queryParamsHandling: "merge",
            // skipLocationChange: true,
          });
        }
      },
      (error) => {
        this._handleError(error);
      }
    );
  }

  _handleError(error) {
    this.wishlists = [];
  }

  defaultImage(): string {
    return "/assets/wishlist/product-not-found.png";
  }

  refreshPage(): void {
    this.router.navigate(["./"], {
      queryParams: { page: this.page?.pageNumber || 1 },
      queryParamsHandling: "merge",
      relativeTo: this.activatedRoute,
    });
  }
}
