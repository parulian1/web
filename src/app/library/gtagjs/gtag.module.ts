import {NgModule, ModuleWithProviders, Optional, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GtagConfig, GtagConfigToken, gtagFactory,} from '@app/library/gtagjs/gtag-factory';
import {GTAG, GtagService} from '@app/library/gtagjs/gtag.service';
import {GtagDirective} from './gtag.directive';


@NgModule({
  declarations: [GtagDirective],
  exports: [
    GtagDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [

  ],
})
export class GtagModule {
  static init(config: GtagConfig): ModuleWithProviders<GtagModule> {
    return {
      ngModule: GtagModule,
      providers: [
        GtagService,
        {provide: GtagConfigToken, useValue: config},
        {
          provide: GTAG,
          useFactory: gtagFactory,
          deps: [[new Optional(), new Inject(GtagConfigToken)]]
        }
      ]
    };
  }
}
