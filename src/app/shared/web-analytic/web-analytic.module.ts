import { ModuleWithProviders, NgModule } from '@angular/core';
import { IWebAnalyticConfig } from '@app/shared/web-analytic/schemas';
import { WEB_ANALYTIC_CONFIG_TOKEN } from '@app/shared/web-analytic/tokens';

@NgModule()
export class WebAnalyticModule {
  static forRoot(config?: IWebAnalyticConfig): ModuleWithProviders<WebAnalyticModule> {
    return {
      ngModule: WebAnalyticModule,
      providers: [
        {
          provide: WEB_ANALYTIC_CONFIG_TOKEN,
          useValue: config,
        }
      ]
    }
  }
}
