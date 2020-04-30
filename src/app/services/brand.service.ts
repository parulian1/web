import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Brand} from "@app/models/brand";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) {
  }

  getHomeBrand(): Observable<HttpResponse<Brand[]>> {
    return this.http
      .cache(true)
      .get<Brand[]>(`/catalog/brand/`, {observe: "response"})
  }
}
