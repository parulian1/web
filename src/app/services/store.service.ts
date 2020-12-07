import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Store} from "@app/models/store";


/**
 * Provides access to all of the available 'stores' which can be shopped.
 * Additionally, provides a mechanism for saving the user's 'preferred' store
 * from which they want to shop inventory from.
 */
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  readonly PREFERRED_STORE_KEY = "preferredStore";

  constructor(private http: HttpClient) { }

  /**
   * The store which the user prefers to purchase items from.
   */
  get preferredStore(): Store {
    if (!(this.PREFERRED_STORE_KEY in localStorage)) {
      return null;
    }
    return JSON.parse(localStorage.getItem(this.PREFERRED_STORE_KEY)) as Store;
  }
  set preferredStore(value: Store) {
    if (!!value) {
      localStorage.setItem(this.PREFERRED_STORE_KEY, JSON.stringify(value));
    } else {
      localStorage.removeItem(this.PREFERRED_STORE_KEY);
    }
  }

  /**
   * Gets **all** the store locations.
   */
  getAll(): Observable<Store[]> {
    // naive -- do better.  We should ensure that if there's more than 250
    // we loop until all pages are retrieved.
    let params = new HttpParams();
    params = params.set('per_page', '250');
    params = params.set('is_active', 'true');
    return this.http
      .cache()
      .get<Store[]>(
        `/fulfillment/warehouse/`,
        {observe: 'body', responseType: 'json', params}
      );
  }

  /**
   * Find Warehouses with available stock by specific product
   * */
  getAvailableStock(href: string): Observable<any> {
    return this.http.post(`/fulfillment/warehouse-stock/search/`, {
      product: href
    }, {observe: 'body'});
  }
}
