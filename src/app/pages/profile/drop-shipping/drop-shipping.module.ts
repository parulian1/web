import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellModule } from '@app/shell/shell.module';
import { SharedModule } from '@app/shared';

import { DropShipListsComponent } from '@app/pages/drop-shipping/drop-ship-list/drop-ship-lists.component';

import { DropShippingRoutingModule } from '@app/pages/drop-shipping/drop-shipping.routing.module';
import {
  DialogSaveCatalogComponent,
  SavedCatalogComponent,
  SavedCatalogListComponent
} from '@app/pages/drop-shipping/saved-catalog';
import { SavedCatalogQtyComponent } from '@app/pages/drop-shipping/saved-catalog/saved-catalog-qty/saved-catalog-qty.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [
    DropShipListsComponent,
    SavedCatalogComponent,
    SavedCatalogListComponent,
    SavedCatalogQtyComponent,
    DialogSaveCatalogComponent
  ],
  imports: [
    CommonModule,
    ShellModule,
    SharedModule,
    DropShippingRoutingModule,
    FormsModule,
    MaterialModule,
  ]
})
export class DropShippingModule {
}
