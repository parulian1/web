import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageComponent} from "@app/pages/page/page.component";
import {PageResolverService} from "@app/pages/page/page-resolver.service";

const routes: Routes = [
  {
    path: ':slug',
    component: PageComponent,
    resolve: {
      page: PageResolverService
    },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PageRoutingModule {
}
