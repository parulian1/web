import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IHomeVideo, IYoutubeOembed } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class HomeVideoService {

  constructor(private http: HttpClient) {
  }

  getHomeVideo(): Observable<HttpResponse<IHomeVideo>> {
    return this.http.get<IHomeVideo>(`/cms/content-video/`, {observe: 'response', responseType: 'json'});
  }

  getOembedData(videoId: string): Observable<HttpResponse<IYoutubeOembed>> {
    const baseUrl = `https://www.youtube.com`;
    const baseParamUrl = `${baseUrl}/watch?v=${videoId}`;

    return this.http.get<IYoutubeOembed>(`${baseUrl}/oembed?format=json&url=${encodeURIComponent(baseParamUrl)}`, {observe: 'response', responseType: 'json'});
  }


}
