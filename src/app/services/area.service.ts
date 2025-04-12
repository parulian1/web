import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import {from, Observable} from 'rxjs';

import {Area, District} from '@app/models/area';
import { map, mergeMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) {
  }

  fetchProvinces(): Observable<HttpResponse<Area[]>> {
    return this.http
      .get<Area[]>(`/fulfillment/address/id/`, {observe: 'response', responseType: 'json'});
  }

  fetchArea(url: string): Observable<HttpResponse<Area[]>> {
    return this.http
      .get<Area[]>(url, {observe: 'response', responseType: 'json'});
  }

  fetchSubDistrict(url: string): Observable<any> {
    return this.http
      .get<any>(url, {responseType: 'json'}).pipe(
        mergeMap((districts: any) =>
          from(districts).pipe(
            map((district: any) => {
              return {name: district.subDistrict.toLowerCase(), cityHref: url};
            })
          )
        ),
        toArray(),
      );
  }

  fetchDistrict(url: string): Observable<HttpResponse<District[]>> {
    return this.http
      .get<District[]>(url, {observe: 'response', responseType: 'json'});
  }

  fetchPinLocation(loc: string): Observable<any> {

    let params = new HttpParams();
    params = params.set('latlng', loc);
    params = params.set('key', '');
    return this.http
      .get<any>(`https://maps.googleapis.com/maps/api/geocode/json`, {params})
      .pipe(
        map((res: any) => res)
      );
  }

  addAddress(address: any): Observable<any> {
    return this.http
      .post<any>(`/iam/address/`, address);
  }

  updateAddress(address: any, id: string): Observable<any> {
    return this.http
      .patch<any>(`/iam/address/${id}/`, address);
  }

  getLngLat(address: string): Observable<any> {
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=
        ${address}&sensor=true&key=`).pipe(
      map((res: any) => res)
    );
  }
}
