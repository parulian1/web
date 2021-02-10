import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOnboarding } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(private http: HttpClient) {}

  fetchOnboarding(): Observable<HttpResponse<IOnboarding[]>> {
    return this.http
      .get<IOnboarding[]>(`/cms/onboarding/`, {observe: 'response'});
  }
}
