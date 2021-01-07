import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Blog, WpBlog} from "@app/models/blog.model";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/marthatilaarblog.wordpress.com';
  private url = `/cms/blog/posts`;
  private endpoint  = 'posts/';

  constructor(
    protected httpClient: HttpClient
  ) { }

  getList(): Observable<WpBlog> {
    return this.httpClient.get<WpBlog>(`${this.url}/`)
  }
}
