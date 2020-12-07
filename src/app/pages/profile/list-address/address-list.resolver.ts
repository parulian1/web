import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Address } from "@app/models/addresses";
import { Observable } from "rxjs";
import { AddressService } from "@app/services";
import { PagedResponse } from "@app/core/pagination";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AddressListResolver implements Resolve<PagedResponse<Address>> {
  constructor(private addressService: AddressService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PagedResponse<Address>> | Observable<never> {
    const query = route.queryParamMap.get("q");
    const page = parseInt(route.queryParamMap.get("page") || "1", 10);

    return this.addressService.fetchList(query, page, 4);
  }
}
