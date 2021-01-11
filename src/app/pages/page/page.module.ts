import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShellModule} from "@app/shell/shell.module";
import {SharedModule} from "@app/shared";
import {PageComponent} from "@app/pages/page/page.component";
import {PageRoutingModule} from "@app/pages/page/page-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {GtagModule} from '@app/library/gtagjs/gtag.module';

@NgModule({
  declarations: [
    PageComponent
  ],
    imports: [
        CommonModule,
        ShellModule,
        SharedModule,
        PageRoutingModule,
        MatToolbarModule,
        GtagModule
    ]
})
export class PageModule {
}
