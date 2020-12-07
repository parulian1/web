import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Category, CategoryFilter} from '@app/models/category';
import {ProductAttributes, ProductClass, ProductDetail} from '@app/models/product-detail';
import {ProductPagedResponse} from '@app/core/pagination/product-paged-response';
import {map} from 'rxjs/operators';
import {ProductLists} from "@app/models/product-lists";
import {environment} from "@env/environment.staging";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  brand: string;


  constructor(private http: HttpClient) {
  }

  // TODO: create a model for Product Detail, and change <<any>> to that model type
  fetchProducts(): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(`/catalog/product/`, {observe: 'response'});
  }

  fetchProduct(slug: string): Observable<HttpResponse<ProductDetail>> {
    return this.http
      .get<ProductDetail>(`/catalog/product/${slug}/`, {observe: 'response'});
  }

  // TODO: create a model for Product Lists, and change <<any>> to that model type
  fetchProductLists(params: HttpParams): Observable<ProductPagedResponse<ProductLists>> {

    let page = params.get('page');
    let per_page = params.get('per_page');
    if (!page) {
      page = '1';
    }

    if (!per_page) {
      per_page = '20';
    }

    params = params.set('page', page);
    params = params.set('per_page', per_page);


    return this.http
      .get<any>(`/catalog/product-search/`, {observe: 'response', params})
      .pipe(
        map(resp => new ProductPagedResponse(resp, parseInt(page, 10))
        ));
  }

  xfetchProductLists(query?: string,
                     sort?: string, category?: string,
                     vendor?: string, price?: string,
                     highlight?: string, page?: number,
                     perPage?: number): Observable<ProductPagedResponse<ProductLists>> {
    let params = new HttpParams();
    let priceParams = '';

    if (query) {
      params = params.set('q', query);
    }

    if (category) {
      params = params.set('category', category);
    }

    if (vendor) {
      params = params.set('vendor', vendor);
    }

    if (sort) {
      params = params.set('ordering', sort);
    }

    if (highlight) {
      params = params.set('highlight', highlight);
    }

    if (price) {
      priceParams = `?${price}`;
    }

    if (page) {
      params = params.set('page', page.toFixed(0).toString());
    }

    params = params.set('per_page', perPage.toFixed(0).toString());

    return this.http
      .get<any>(`/catalog/product-search/${priceParams}`, {observe: 'response', params})
      .pipe(
        map(resp => new ProductPagedResponse(resp, page))
      );
  }

  fetchCategoryLists(): Observable<HttpResponse<Category[]>> {
    return this.http
      .get<Category[]>(`/catalog/category/`, {observe: 'response'});
  }

  fetchCategoryListsByDepth(): Observable<HttpResponse<Category[]>> {
    let params = new HttpParams();
    params = params.set('depth', '1');
    params = params.set('per_page', '5');

    return this.http
      .get<Category[]>(`/catalog/category/`, {observe: 'response', params});
  }

  fetchProductAttributes(): Observable<HttpResponse<ProductAttributes[]>> {
    return this.http
      .get<ProductAttributes[]>(`/catalog/product-attribute/`, {observe: 'response', responseType: 'json'});
  }

  fetchProductClass(): Observable<HttpResponse<ProductClass[]>> {
    return this.http
      .get<ProductClass[]>(`/catalog/product-class/`, {observe: 'response', responseType: 'json'});
  }

  /**
   * Gets a single product from the API, based on it's href.
   *
   * @param href an absolute URL for a single product.
   */
  fetchProductByHref(href: string): Observable<ProductDetail> {
    return this.http.get<any>(href, {observe: 'body', responseType: 'json'});
  }

  sortProduct(param: string) {
    return this.http.get<any>(`/catalog/product/?ordering=${param}`, {observe: 'response'});
  }

  fetchCategories(): Observable<HttpResponse<CategoryFilter[]>> {
    return this.http.get<CategoryFilter[]>('/catalog/categories/main-menu/', {observe: 'response'});
  }

  fetchReview(): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(`/order/review/?type=pdp`, {observe: 'response'});
  }

  fetchBySearchBox(params: { q: string, limit: number }): Observable<any> {
    let parameters = new HttpParams();

    if (params) {
      parameters = parameters.set('q', params.q);
      parameters = parameters.set('page', '1');
      parameters = parameters.set('per_page', String(params.limit));
    }

    return this.http
      .get<any>(`/catalog/product-search/`, {observe: 'response', params: parameters})
  }

  fetchVideo(id: string): Observable<any> {
    const apiKey = environment.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}
     &part=snippet,contentDetails,statistics,status`;

    return this.http
      .get<any>(url)
      .pipe(
        map((res) => {
          return res;
        })
      )
  }

  fetchVideoChannel(id: string): Observable<any> {
    const apiKey = environment.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&fields=items%2Fsnippet%2Fthumbnails&key=${apiKey}`;

    return this.http
      .get<any>(url)
      .pipe(
        map((res) => {
          return res;
        })
      )
  }
}
