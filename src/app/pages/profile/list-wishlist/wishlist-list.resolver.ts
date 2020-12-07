import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";

import { WishlistService } from "@app/services";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WishlistListResolver implements Resolve<any> {
  private page: number = 1;
  private perPage: number = 5;
  private query: string;

  constructor(private wishlistService: WishlistService, private router: Router, private route: ActivatedRoute) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.query = route.queryParamMap.get("wishlist_query") || "";
    this.page = parseInt(route.queryParamMap.get("page") || "1", 10);
    this.perPage = 5;

    return this.wishlistService
      .fetchListWishlistWithWarehouses({ query: this.query, page: this.page, perPage: this.perPage })
      .pipe(
        // if status code is 404 its cause by the page doesnt have item,
        // so that we need redirect user back to the first page.
        catchError(() => {
          this.redirectToPreviousPage();
          return of([]);
        })
      );
  }

  redirectToPreviousPage(): void {
    this.router.navigate(["/profile/list-wishlist"], {
      queryParams: { page: this.page - 1 },
      queryParamsHandling: "merge",
      relativeTo: this.route,
    });
  }
}
