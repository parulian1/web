import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from "@app/pages/cart/cart.component";
import {ShellModule} from "@app/shell/shell.module";
import {SharedModule} from "@app/shared";
import {EntityToSlugPipe} from "@app/shared/utils/entity-to-slug.pipe";
import { DeleteCartDialogComponent } from './delete-cart-dialog/delete-cart-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AddToWishlistComponent } from './add-to-wishlist/add-to-wishlist.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
    declarations: [CartComponent, DeleteCartDialogComponent, AddToWishlistComponent],
    imports: [
        CommonModule,
        ShellModule,
        SharedModule,
        CartRoutingModule,
        MatDialogModule,
        MatIconModule
    ],
    exports: [
        AddToWishlistComponent
    ],
    providers: [
        EntityToSlugPipe
    ]
})
export class CartModule {
}
