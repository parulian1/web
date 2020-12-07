import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShellModule} from "@app/shell/shell.module";
import {SharedModule} from "@app/shared";
import {PageComponent} from "@app/pages/page/page.component";
import {PageRoutingModule} from "@app/pages/page/page-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    ShellModule,
    SharedModule,
    PageRoutingModule,
    MatToolbarModule
  ]
})
export class PageModule {
}
