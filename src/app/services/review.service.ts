import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {RatingSummary, Review} from "@app/models";
import {EntityToSlugPipe} from "@app/shared/utils";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient, private pipe: EntityToSlugPipe) {
  }

  checkReviewStatus(orderHref: string, productHref: string): Observable<HttpResponse<any>> {
    let params = new HttpParams();

    if (productHref) {
      params = params.set('product', this.pipe.transform(productHref));
    }


    if (orderHref) {
      params = params.set('order', orderHref);
    }

    return this.http
      .get<any>(`/order/review/`, {observe: 'response', params, responseType: 'json'});
  }

  checkReviewInOrder(orderHref: string, productHref: string): Observable<HttpResponse<any>> {
    let params = new HttpParams();

    if (productHref) {
      params = params.set('product', productHref);
    }


    if (orderHref) {
      params = params.set('order', orderHref);
    }

    return this.http
      .get<any>(`/order/review/`, {observe: 'response', params, responseType: 'json'});
  }


  createReview(review: any): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(`/order/review/`, review, {observe: 'response'});
  }

  addVote(id: string, type: string): Observable<any> {
    let params = new HttpParams();

    if (type === 'up') {
      params = params.set('vote', '1');
    } else {
      params = params.set('vote', '-1');
    }

    return this.http
      .post<any>(`/order/review/add-vote/${id}/`, {}, {observe: 'response', params, responseType: 'json'});
  }

  fetchReview(): Observable<HttpResponse<Review[]>> {
    return this.http
      .get<Review[]>(`/order/review/`, {observe: 'response', responseType: 'json'});
  }

  fetchReviewProduct(href: string): Observable<HttpResponse<Review[]>> {
    let params = new HttpParams();
    if (href) {
      params = params.set('product', href);
    }

    params = params.set('type', 'pdp');

    return this.http
      .get<Review[]>(`/order/review/`, {observe: 'response', params, responseType: 'json'});
  }

  fetchRatingSummary(slug: string): Observable<HttpResponse<RatingSummary>> {
    return this.http
      .get<RatingSummary>(`/order/rating-summary/product/${slug}/`, {observe: 'response', responseType: 'json'});
  }

  fetchReviewProductInOrder(productSlug: string, orderHref: string): Observable<HttpResponse<Review[]>> {
    let params = new HttpParams();
    params = params.set('product', productSlug);
    params = params.set('order', orderHref);
    return this.http
      .get<Review[]>(`/order/review/`, {observe: 'response', params, responseType: 'json'});
  }
}
