import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellModule } from '@app/shell';
import { SharedModule } from '@app/shared';
import { PromotionComponent } from './promotion.component';
import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionListComponent } from './promotion-list/promotion-list.component';

@NgModule({
  declarations: [
    PromotionComponent,
    PromotionListComponent
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
