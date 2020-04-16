import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sla} from "@app/models/sla";
import {Observable} from "rxjs";

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
