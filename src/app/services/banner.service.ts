import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Banner} from "@app/models/banner";

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }

  getMainBanners(){
    return this.http
      .cache(true)
      .get<Banner[]>(`/cms/banners/`)
  }
}
