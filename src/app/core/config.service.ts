import { Injectable, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configuration, IConfigChatService } from '@app/models/configuration';
import { EMPTY, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Configuration = new Configuration();
  analyticToolBaseUrl = '/client/analytic-tool';

  chatBaseUrl = '/client/chat-service'

  constructor(
    private http: HttpClient,
  ) { }

  processConfig() {
    const commonConfig$ = this.http.get<Configuration>('/client/site-config/', {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      tap(result => this.config = Object.assign(this.config, result)),
    )

    const chatConfig$ = this.http.get<IConfigChatService[]>(`${this.chatBaseUrl}/`, {
      observe: 'body',
      responseType: 'json',
    }).pipe(
      tap(result => {
        if (result.length > 0) { this.config.chatService = result[0] }
      }),
      catchError(e => {
        return EMPTY;
      })
    )

    // join anything configs in here
    // but return still using commonConfig instead
    return forkJoin({
      commonConfig: commonConfig$,
      chatConfig: chatConfig$,
    }).pipe(
      map((result: { commonConfig, chatConfig }) => result.commonConfig),
    ).toPromise();
  }


  loadConfig(): Promise<Configuration> {
    return this.processConfig();
  }

  /**
   * load chat service: append script (widget code) chat service.
   */
  loadChatService(renderer2: Renderer2, document: Document, config: Configuration): void {
    if (config?.chatService?.widgetCode) {
      renderer2.appendChild(
        document.body,
        document.createRange().createContextualFragment(
          config?.chatService?.widgetCode
        )
      )
      this.loadChatServiceConfig(renderer2, document);
    }
  }

  /**
   * additional config for chat service (zendesk)
   */
  private loadChatServiceConfig(renderer2: Renderer2, document: Document): void {
    const script = renderer2.createElement('script');
    script.type = 'text/javascript';
    script.text = `
     window.zESettings = {
    webWidget: {
      offset: {
        mobile: {
          vertical: '50px'
        }
      }
    }
  };
      `;
    renderer2.appendChild(document.body, script);
  }
}
