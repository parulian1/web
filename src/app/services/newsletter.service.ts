import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '@app/core/http/base-api.service';
import { Newsletter } from "@app/models/newsletter";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService extends BaseApiService<Newsletter> {

  baseUrl = '/iam/newsletter-subscribe';

  constructor(protected httpClient: HttpClient) {
    super();
  }
}
