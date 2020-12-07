import { Injectable } from "@angular/core";
import { AddressEntity } from "@app/pages/profile/list-address/entities/address.entity";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Addresses, Address } from "@app/models/addresses";
import { PagedResponse } from "@app/core/pagination";
import { map } from "rxjs/operators";
import { EntityToSlugPipe } from "@app/shared/utils";

@Injectable({
  providedIn: "root",
})
export class AddressService {
  public baseUrl: string = "/iam/address/";

  constructor(
    private httpClient: HttpClient,
    private entityToSlugPipe: EntityToSlugPipe,
  ) {}

  absoluteUrl(url: string): string {
    return `${this.baseUrl}${this.entityToSlugPipe.transform(url)}/`;
  }

  fetchAddress(): Observable<HttpResponse<Addresses[]>> {
    return this.httpClient.get<Addresses[]>(`${this.baseUrl}`, { observe: "response", responseType: "json" });
  }

  fetchList(query?: string, page: number = 1, perPage?: number): Observable<PagedResponse<Address>> {
    // create query params --> ?q=maybe&page=1
    let params = new HttpParams().set("page", page.toFixed(0).toString());

    if (perPage) {
      params = params.set("per_page", perPage.toFixed(0).toString());
    }

    if (query) {
      params = params.set("q", query);
    }

    return this.httpClient
      .get<Address[]>(`${this.baseUrl}`, { observe: "response", responseType: "json", params })
      .pipe(map((resp) => new PagedResponse(resp)));
  }

  create(address: AddressEntity): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, address.toObject(), { observe: "response" });
  }

  update(address: Addresses, addressEntity: AddressEntity): Observable<any> {
    return this.httpClient.patch(this.absoluteUrl(address.href), addressEntity.toObject(), { observe: "response" });
  }

  destroy(href: string): Observable<any> {
    return this.httpClient.delete(this.absoluteUrl(href));
  }

  setDefaultShipping(href: string): Observable<any> {
    return this.httpClient.put(`${this.absoluteUrl(href)}main`, {
      isDefaultShipping: true,
      // isDefaultBilling:true
    });
  }

  setMainAddress(href: string): Observable<HttpResponse<any>> {
    const id = this.entityToSlugPipe.transform(href);
    return this.httpClient.put<any>(`/iam/address/${id}/main`, {}, { observe: 'response' });
  }
}
