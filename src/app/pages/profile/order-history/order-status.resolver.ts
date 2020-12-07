import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {OrderHistoryService} from "@app/services";
import {Choice} from "@app/models/drf";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class OrderStatusResolver implements Resolve<Choice[]> {
  constructor(protected service: OrderHistoryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Choice[]> | Observable<never> {
    return this.service.getFieldChoices('status');
  }
}
