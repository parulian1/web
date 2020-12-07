import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {ProductDetailComponent} from '@app/pages/product-detail';

const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'product-detail', component: ProductDetailComponent},
  {path: '', loadChildren: () => import('./pages').then(m => m.PagesModule)},
  // Fallback when no prior route is matched
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      onSameUrlNavigation: 'reload',
    })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
