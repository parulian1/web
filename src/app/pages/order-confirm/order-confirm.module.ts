import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellModule } from "@app/shell";
import { SharedModule } from "@app/shared";

import { OrderConfirmRoutingModule } from "@app/pages/order-confirm/order-confirm.routing.module";
import { OrderConfirmComponent } from "@app/pages/order-confirm/order-confirm.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrderConfirmComponent,
  ],
  imports: [
    CommonModule,
    ShellModule, SharedModule,
    OrderConfirmRoutingModule,
    MatTabsModule, MatToolbarModule,
    ReactiveFormsModule,
  ]
})
export class OrderConfirmModule { }
