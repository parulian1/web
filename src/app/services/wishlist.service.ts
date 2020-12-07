import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { from, Observable } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";

import { Wishlist } from "@app/models/wishlist";
import { StoreService } from "@app/services/store.service";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  baseUrl: string = "/order/wishlist/";

  constructor(private httpClient: HttpClient, private storeService: StoreService) {}

  addProductToWishlist(product: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, { product: product.href });
  }

  deleteProductFromWishlist(product: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}delete_product/`, { product: product.href });
  }

  findAll(p: any = {}): Observable<any> {
    // create query params --> ?q=maybe&page=1
    let params = new HttpParams().set("page", p.page.toFixed(0).toString());

    if (p.perPage) {
      params = params.set("per_page", p.perPage.toFixed(0).toString());
    }

    if (p.query) {
      params = params.set("q", p.query);
    }

    return this.httpClient.get(this.baseUrl, { params, observe: "response" }).pipe(
      map((result) => {
        return {
          data: result.body,
          totalItems: result.headers.get("X-Total-Results"),
          currentPage: result.headers.get("X-Page") || p.page || 1,
          pageSize: result.headers.get("X-Page-Size") || 10,
          pageNumber: p.page,
          links: result.headers.get("Link") || "",
        };
      })
    );
  }

  _getParams(params: object): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => (httpParams = httpParams.set(key, params[key])));
    return httpParams;
  }

  getStatusProductIsWishListed(product: any) {
    return this.httpClient.post(`${this.baseUrl}product_is_exist/`, { product: product.href });
  }

  fetchWishlistStatus(href: string): Observable<any> {
    return this.httpClient.post(`/order/wishlist/product_is_exist/`, { product: href });
  }

  fetchListWishlistWithWarehouses(params: {} = {}): Observable<any> {
    return this.findAll(params).pipe(
      mergeMap((wishlistsResult: any) => {
        return from(wishlistsResult.data).pipe(
          mergeMap((wishlist: Wishlist) => {
            return this.storeService.getAvailableStock(wishlist.product.href).pipe(
              map((warehouses) => {
                return { ...wishlist, warehouses, selectedWarehouse: warehouses[0] || null };
              })
            );
          }),
          toArray(),
          map((wishlists) => {
            let { data, ...result } = wishlistsResult;
            return { data: wishlists, ...result };
          })
        );
      })
    );
  }
}
