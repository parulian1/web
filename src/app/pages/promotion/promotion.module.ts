import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellModule } from '@app/shell';
import { SharedModule } from '@app/shared';
import { PromotionComponent } from './promotion.component';
import { PromotionRoutingModule } from './promotion-routing.module';
import {GtagModule} from '@app/library/gtagjs/gtag.module';

@NgModule({
  declarations: [
    PromotionComponent
  ],
    imports: [
        CommonModule,
        ShellModule,
        SharedModule,
        PromotionRoutingModule,
        GtagModule
    ]
})
export class PromotionModule {
}
