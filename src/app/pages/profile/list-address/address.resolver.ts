import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Wishlist} from "@app/models/wishlist";
import {Addresses} from "@app/models/addresses";
import {ProfileService} from "@app/services";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AddressResolver implements Resolve<Addresses> {
  constructor(
    private profileService: ProfileService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.profileService.fetchListAddresses();
  }
}
