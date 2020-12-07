import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Page} from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }

  getPage(path: string): Observable<Page> {
    return this.http
      .cache(true)
      .get<Page>(`/cms/page/${path}/`, {observe: 'body', responseType: 'json'});
  }
}
