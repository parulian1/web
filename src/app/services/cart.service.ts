import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '@app/models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  fetchCart(etag ?: string): Observable<HttpResponse<Cart>> {
    let headers = new HttpHeaders();
    if (!!etag) {
      headers = headers.append('If-None-Match', etag);
    }
    return this.http
      .get<Cart>(`/order/cart/`, {observe: 'response', headers});
  }

  addToCart(payload: { product: string, quantity: number, warehouse: string }): Observable<HttpResponse<any>> {
    return this.http
      .post(`/order/cart-item/`,{
        product: payload.product,
        quantity: payload.quantity,
        warehouse: payload.warehouse
      }, {observe: 'response'});
  }

  updateCart(id: string, quantity: number): Observable<HttpResponse<any>> {
    return this.http
      .put(`/order/cart-item/${id}/`, {
        quantity
      }, {observe: 'response'});
  }

  removeCartItem(id: string): Observable<HttpResponse<any>> {
    return this.http
      .delete(`/order/cart-item/${id}/`, {observe: 'response'});
  }


  applyVoucher(code: string): Observable<HttpResponse<any>> {
    return this.http.patch(`/order/cart/`, { code },{ observe: 'response'});
  }

  clearVoucher(): Observable<HttpResponse<any>> {
    return this.http.delete(`/order/cart/delete-voucher/`, { observe: 'response'});
  }

}
