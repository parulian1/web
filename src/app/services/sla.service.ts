import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Sla} from "@app/models/sla";


@Injectable({
  providedIn: 'root'
})
export class SlaService {

  constructor(private http: HttpClient) {
  }

  getSla(){
    return this.http
      .cache(true)
      .get<Sla[]>(`/cms/sla/`)
  }


}
