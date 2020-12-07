import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BrandDetailComponent} from "@app/pages/brand-detail/brand-detail.component";
import {BrandDetailResolverService} from "@app/pages/brand-detail/brand-detail-resolver.service";

const routes: Routes = [
  {
    path: ':slug',
    component: BrandDetailComponent,
    resolve: {
      brand: BrandDetailResolverService
    },
    runGuardsAndResolvers: 'always'
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BrandDetailRoutingModule {}
