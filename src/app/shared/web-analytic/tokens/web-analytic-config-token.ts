import {InjectionToken} from '@angular/core';
import {IWebAnalyticConfig} from '@app/shared/web-analytic/schemas';

export const WEB_ANALYTIC_CONFIG_TOKEN = new InjectionToken<IWebAnalyticConfig>(
  'web_analytic_config_token'
);
