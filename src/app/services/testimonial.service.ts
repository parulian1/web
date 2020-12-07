import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Testimonial } from '@app/models/testimonial';


interface QueryParams {
  perPage?: number,
  page?: number,
  is_active?: boolean,
}


@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http: HttpClient) {
  }

  fetchTestimonial(p: QueryParams = {}): Observable<HttpResponse<Testimonial[]>> {
    let params = new HttpParams().set("page", p.page.toFixed(0).toString() || '1');

    if (p.perPage) {
      params = params.set("per_page", p.perPage.toFixed(0).toString());
    }

    if (p.is_active) {
      params = params.set("is_active", "true");
    }

    return this.http
      .get<Testimonial[]>(`/cms/testimonial/`, {params, observe: 'response'});
  }
}
