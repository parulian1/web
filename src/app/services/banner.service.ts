import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Banner} from '@app/models/banner';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) {
  }

  getMainBanners(slug: string = ''): Observable<HttpResponse<Banner[]>> {
    return this.http
      .cache(true)
      .get<Banner[]>(`/cms/banner/${slug}`, {observe: 'response'});
  }
}
