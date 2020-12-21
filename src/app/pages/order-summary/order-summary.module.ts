import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";

import { ShellModule } from "@app/shell";
import { SharedModule } from "@app/shared";

import { OrderSummaryRoutingModule } from "./order-summary.routing.module";
import { OrderSummaryComponent } from "./order-summary.component";
import {
  OrderSummaryProgressComponent,
  OrderSummaryDoneComponent,
  OrderSummaryManualTransferComponent
} from "./components";

@NgModule({
  declarations: [
    OrderSummaryComponent,
    OrderSummaryProgressComponent, OrderSummaryDoneComponent,
    OrderSummaryManualTransferComponent,
  ],
  imports: [
    CommonModule,
    ShellModule, SharedModule,
    OrderSummaryRoutingModule,
    MatTabsModule, MatToolbarModule
  ],
})
export class OrderSummaryModule {}
