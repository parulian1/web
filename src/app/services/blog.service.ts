import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Blog, WpBlog} from '@app/models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private url = `/cms/blog/posts`;

  constructor(
    protected httpClient: HttpClient
  ) { }

  getList(): Observable<WpBlog> {
    return this.httpClient.get<WpBlog>(`${this.url}/`)
  }
}
