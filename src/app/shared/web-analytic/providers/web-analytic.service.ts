import { Inject, Injectable, Optional } from '@angular/core';
import {WEB_ANALYTIC_CONFIG_TOKEN, WEB_ANALYTIC_LOCAL_CONFIG_TOKEN} from '@app/shared/web-analytic/tokens';
import { IWebAnalyticConfig } from '@app/shared/web-analytic/schemas';
import { AnalyticAction } from '@app/shared/web-analytic/schemas/analytic-action';
import { DOCUMENT } from '@angular/common';
import { WEB_ANALYTIC_GTAG } from '@app/shared/web-analytic/tokens/gtag-token';
import { Gtag } from '@app/shared/web-analytic/schemas/gtag';
import { WebAnalyticType } from '@app/shared/web-analytic/schemas/web-analytic-type';

@Injectable({
  providedIn: 'root',
})
export class WebAnalyticService {
  isLoaded = false;

  constructor(
    @Optional()
    @Inject(WEB_ANALYTIC_CONFIG_TOKEN) public config: IWebAnalyticConfig,
    @Optional()
    @Inject(WEB_ANALYTIC_LOCAL_CONFIG_TOKEN) public localConfig: { id: string, type: WebAnalyticType },
    @Inject(DOCUMENT) public document: Document,
    @Inject(WEB_ANALYTIC_GTAG) public gtag: Gtag,
  ) {
    if (this.config == null) {
      this.config = { id: null, type: 'ga' };
    }

    this.config = {
      ...this.config,
      id: this.localConfig?.id || this.config.id,
      type: this.localConfig?.type || this.config.type,
    }
  }

  addScriptToDom(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isLoaded) {
        return resolve(this.isLoaded);
      }

      const s: HTMLScriptElement = document.createElement('script');
      s.async = true;

      if (this.config.type === WebAnalyticType.GTM) {
        // gtm
        this.gtag('event', 'gtm.js', {'gtm.start': new Date().getTime()});
        s.src = `https://www.googletagmanager.com/gtm.js?id=${this.config.id}`;

      } else {
        // ga
        const initCommands = [
          { command: 'js', value: [ new Date() ] },
          { command: 'config', value: [this.config.id] },
        ];

        initCommands.forEach(command => {
          this.gtag(command.command, ...command.value);
        });
        s.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.id}`;
      }

      s.addEventListener('load', () => {
        return resolve(this.isLoaded = true);
      });
      s.addEventListener('error', () => {
        return reject(false);
      })

      const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
      head.appendChild(s);
    });
  }

  pushTag(event: string, data: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.isLoaded) {
        this.addScriptToDom().then(() => {
          this.gtag('event', event, data);
          return resolve();
        }).catch(() => reject());
      }

      this.gtag('event', event, data);
      return resolve();
    });
  }

  event<IEvent>(action: AnalyticAction, data: IEvent): void {
    this.pushTag(action, data);
  }
}
