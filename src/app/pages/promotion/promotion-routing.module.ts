import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PromotionComponent } from './promotion.component';
import {PromotionResolverService} from '@app/pages/promotion/promotion-resolver.service';
import {PromotionListComponent} from '@app/pages/promotion/promotion-list/promotion-list.component';
import {PromotionListResolverService} from '@app/pages/promotion/promotion-list/promotion-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PromotionListComponent,
    resolve: { page: PromotionListResolverService}
  },
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
