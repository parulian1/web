import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {StoreLocation} from "@app/models/store";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getStoreLocation():Observable<HttpResponse<StoreLocation[]>>{
    return this.http
      .cache(true)
      .get<StoreLocation[]>(`/fulfillment/warehouses/`, {observe: 'response'})
  }
}
