import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellModule } from '@app/shell';
import { SharedModule } from '@app/shared';
import { PromotionComponent } from './promotion.component';
import { PromotionRoutingModule } from './promotion-routing.module';

@NgModule({
  declarations: [
    PromotionComponent
  ],
  imports: [
    CommonModule,
    ShellModule,
    SharedModule,
    PromotionRoutingModule
  ]
})
export class PromotionModule {
}
