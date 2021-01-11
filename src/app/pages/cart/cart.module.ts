import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from '@app/pages/cart/cart.component';
import {ShellModule} from '@app/shell/shell.module';
import {SharedModule} from '@app/shared';
import {EntityToSlugPipe} from '@app/shared/utils/entity-to-slug.pipe';
import { DeleteCartDialogComponent } from '@app/pages/cart/delete-cart-dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { AddToWishlistComponent } from '@app/pages/cart/add-to-wishlist';
import {MatIconModule} from '@angular/material/icon';
import {GtagModule} from '@app/library/gtagjs/gtag.module';


@NgModule({
    declarations: [CartComponent, DeleteCartDialogComponent, AddToWishlistComponent],
    imports: [
        CommonModule,
        ShellModule,
        SharedModule,
        CartRoutingModule,
        MatDialogModule,
        MatIconModule,
        GtagModule
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
