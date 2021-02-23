import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { Logger } from "@app/core";
import { WishlistService } from "@app/services";

const logging = new Logger('wishlist-list.resolver');

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
          this.redirectToFirstPage();
          return of([]);
        })
      );
  }

  redirectToFirstPage(): void {
    this.router.navigate(["/profile/list-wishlist"], {
      queryParams: { page: 1 },
      queryParamsHandling: "merge",
      relativeTo: this.route,
    });
  }

  redirectToProfile(e: HttpErrorResponse): void {
    logging.warn(`problem with warehouse, status: ${e.status}`);
    this.router.navigate(["/profile"]);
  }
}
