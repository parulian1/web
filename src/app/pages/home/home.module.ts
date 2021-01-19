import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { ShellModule } from '@app/shell';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {GtagModule} from '@app/library/gtagjs/gtag.module';

@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ShellModule,
        SharedModule,
        GtagModule
    ]
})
export class HomeModule { }
