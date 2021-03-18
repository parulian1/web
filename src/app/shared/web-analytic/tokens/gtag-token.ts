import { InjectionToken } from '@angular/core';
import { Gtag } from '@app/shared/web-analytic/schemas/gtag';


export function GTagFn(): any {
  if (window) {
    const dataLayer = window['dataLayer'] = window['dataLayer'] || [];
    return window['gtag'] = window['gtag'] || function() {
      dataLayer.push(arguments as any);
    }
  } else {
    return null;
  }
}


export const WEB_ANALYTIC_GTAG = new InjectionToken<Gtag>('web-analytic-gtag', {
  providedIn: 'root',
  factory: () => GTagFn(),
})
