import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Navigation} from "@app/models/navigation";

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
}
