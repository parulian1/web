import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {extract, authentication} from '@app/core';

import { OrderConfirmComponent } from "./order-confirm.component";
import {OrderConfirmChoicesResolver} from "@app/pages/order-confirm/order-confirm-choices.resolver";

const routes: Routes = [
  {
    path: "",
    component: OrderConfirmComponent,
    runGuardsAndResolvers: "always",
    canActivate: [
      authentication.AuthenticationGuard,
    ],
    resolve: {
      choices: OrderConfirmChoicesResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderConfirmRoutingModule {}
