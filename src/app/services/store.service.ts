import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StoreLocation} from "@app/models/store";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getStoreLocation(){
    return this.http
      .cache(true)
      .get<StoreLocation[]>(`/fulfillment/warehouses/`)
  }
}
