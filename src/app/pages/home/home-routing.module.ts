import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannerResolverService } from '@app/shell/banner/banner-resolver.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      banners: BannerResolverService
    },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
