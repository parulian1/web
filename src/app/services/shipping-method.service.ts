import {Injectable} from '@angular/core';
import {BaseApiService} from '@app/core/http/base-api.service';
import {ShippingMethod} from '@app/models/shipping-method';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShippingMethodService extends BaseApiService<ShippingMethod> {

  baseUrl = '/fulfillment/provider/';

  constructor(protected httpClient: HttpClient) {
    super();
  }


}
