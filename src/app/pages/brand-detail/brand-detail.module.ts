import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrandDetailComponent} from "@app/pages/brand-detail/brand-detail.component";
import {ShellModule} from "@app/shell/shell.module";
import {SharedModule} from "@app/shared";
import {BrandDetailRoutingModule} from "@app/pages/brand-detail/brand-detail-routing.module";
import {GtagModule} from '@app/library/gtagjs/gtag.module';

@NgModule({
  declarations: [
    BrandDetailComponent
  ],
    imports: [
        CommonModule,
        ShellModule,
        SharedModule,
        BrandDetailRoutingModule,
        GtagModule
    ]
})
export class BrandDetailModule {}
