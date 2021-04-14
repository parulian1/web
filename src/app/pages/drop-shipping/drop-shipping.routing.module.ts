import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropShipListsComponent } from '@app/pages/drop-shipping/drop-ship-list/drop-ship-lists.component';
import { SavedCatalogListResolver } from '@app/pages/drop-shipping/saved-catalog/saved-catalog-list.resolver';
import { SavedCatalogResolver } from '@app/pages/drop-shipping/saved-catalog/saved-catalog.resolver';
import {
  DropShipListResolver,
  SavedCatalogComponent,
  SavedCatalogListComponent
} from '@app/pages/drop-shipping/drop-ship-list';

const routes: Routes = [
  {
    path: '',
    component: DropShipListsComponent,
    resolve: {resellerCatalog: DropShipListResolver},
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'saved-catalog',
        children: [
          {
            path: '',
            component: SavedCatalogListComponent,
            resolve: {page: SavedCatalogListResolver},
            runGuardsAndResolvers: 'always'
          },
          {
            path: ':id',
            component: SavedCatalogComponent,
            resolve: { entity:  SavedCatalogResolver },
            runGuardsAndResolvers: 'always'
          }
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropShippingRoutingModule {
}

