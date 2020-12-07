import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {OrderShipment} from "@app/models/order";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderShipmentService {

  constructor(protected http: HttpClient) {
  }

  fetchShipmentById(url?: string): Observable<HttpResponse<OrderShipment>> {
    return this.http.cache(true).get<OrderShipment>(url, {observe: 'response'})
  }
}
