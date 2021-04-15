import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductRoutingModule} from './product-routing.module';
import {ProductComponent} from './product.component';
import {ShellModule} from '@app/shell/shell.module';
import {SharedModule} from '@app/shared';
import { AddToCartDialogComponent } from './add-to-cart-dialog/add-to-cart-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {GtagModule} from '@app/library/gtagjs/gtag.module';
import { AddToResellerDialogComponent } from '@app/pages/product/add-to-reseller-dialog';


@NgModule({
  declarations: [
    ProductComponent,
    AddToCartDialogComponent,
    AddToResellerDialogComponent
  ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        ShellModule,
        SharedModule,
        MatDialogModule,
        GtagModule
    ]
})
export class ProductModule {
}
