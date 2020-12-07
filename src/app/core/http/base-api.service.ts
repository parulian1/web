import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ShippingCost} from '@app/models/shipping-method';
import {Addresses} from "@app/models/addresses";


export abstract class BaseApiService<T> {

  protected httpClient: HttpClient;
  protected baseUrl: string;

  fetchList(isActive?: boolean): Observable<T[]> {
    let params = new HttpParams();
    if (isActive) {
      params = params.set("is_active", "true");
    }
    return this.httpClient
      .get<T[]>(`${this.baseUrl}`, {observe: 'response', responseType: 'json', params})
      .pipe(map(resp => resp.body));
  }

  getShippingCost(weight: number, origin: string, destination: string): Observable<HttpResponse<ShippingCost[]>> {
    let params = new HttpParams();
    params = params.set('weight', weight.toString());
    params = params.set('origin', origin);
    params = params.set('destination', destination);

    return this.httpClient
      .get<ShippingCost[]>(`/fulfillment/shipping-cost/`, {observe: 'response', params});
  }

  createOrder(order: any): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(`/order/checkout/`, order, {observe: 'response'});
  }

  fetchPaymentRequest(order: any): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(`/order/payment-request/`, order, {observe: 'response', responseType: 'json'});
  }

  fetchOrderSummary(orderNumber: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`/order/order-summary/${orderNumber}/`, {observe: 'response', responseType: 'json'});
  }

  fetchDefaultAddress(): Observable<Addresses> {
    return this.httpClient
      .get<Addresses>(`/iam/address/shipping/`, {responseType: 'json'});
  }

  create(entity: T | FormData): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<T>(`${this.baseUrl}/`, entity, {observe: 'response', responseType: 'json'});
  }
}
