import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Navigation} from "@app/models/navigation";

interface INavigationParams {
  is_active?: boolean;
  page?: number;
  data?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private http: HttpClient) {
  }

  getNavbar(): Observable<HttpResponse<Navigation[]>> {
    return this.http
      .cache(true)
      .get<Navigation[]>(`/cms/navigation/`, {observe: "response"})
  }

  getNavigationByType(type: string, params: INavigationParams = {}): Observable<HttpResponse<Navigation[]>> {
    let httpParams = new HttpParams(); // set params to HttpParams object
    Object.keys(params).forEach(key => httpParams = httpParams.set(key, params[key].toString()));

    return this.http.get<Navigation[]>(
      `/cms/navigation/${type}/item/`,
      {params: httpParams, observe: "response"})
  }
}
