import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PromotionComponent } from './promotion.component';
import {PromotionResolverService} from '@app/pages/promotion/promotion-resolver.service';

const routes: Routes = [
  {
    path: ':slug',
    component: PromotionComponent,
    resolve: { promotion: PromotionResolverService },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PromotionRoutingModule {
}
