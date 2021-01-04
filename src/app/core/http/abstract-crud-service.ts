import {HttpClient, HttpParams, HttpResponseBase} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PagedResponse } from '../pagination';

/**
 * Same as the abstract-crud service in admin, but skips the choice
 * fields support
 */
export abstract class AbstractCrudService<T extends {href: string}> {

  protected httpClient: HttpClient;
  protected baseUrl: string;  // this would be best set from crawling the API root, but maybe later for that.

  // retrieves a single object from the API based on it's slug
  fetch(slug: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.baseUrl}/${slug}/`, {observe: 'body', responseType: 'json'});
  }

  /**
   * Gets a paginated list of data from the API.
   *
   * @param query some text used to filter the results; optional.
   * @param page the page number to fetch from the API; default 1.
   */
  fetchList(query?: string, page: number = 1): Observable<PagedResponse<T>> {
    // create query params --> ?q=maybe&page=1
    let params = new HttpParams().set('page', page.toFixed(0).toString());
    if (query) {
      params = params.set('q', query);
    }

    return this.httpClient
      .get<T[]>(`${this.baseUrl}/`, {observe: 'response', responseType: 'json', params})
      .pipe(map(resp => new PagedResponse(resp)));
  }

  fetchParamList(params: HttpParams): Observable<PagedResponse<T>> {
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

    return this.httpClient
      .get<T[]>(`${this.baseUrl}/`, {observe: 'response', responseType: 'json', params})
      .pipe(map(resp => new PagedResponse(resp)));

  }

  create(entity: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.baseUrl}/`, entity, {observe: 'body', responseType: 'json'});
  }

  update(entity: T): Observable<T> {
    return this.httpClient
      .patch<T>(entity.href, entity, {observe: 'body', responseType: 'json'});
  }

  /**
   * Shortcut method; either creates or updates an object based on whether the .href
   * attribute is already set.  If not set, assumes that the object must be created.
   */
  save(entity: T): Observable<T> {
    return (!!entity.href) ? this.update(entity) : this.create(entity);
  }

  delete(entity: T|{href: string}): Observable<HttpResponseBase> {
    return this.httpClient
      .delete(entity.href, {observe: 'response', responseType: 'json'});
  }
}
