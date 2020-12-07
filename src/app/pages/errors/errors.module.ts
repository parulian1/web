import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '@app/shared';
import {ShellModule} from '@app/shell';
import {ErrorsRoutingModule} from './errors-routing.module';
import {NotFoundComponent} from './not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    ShellModule,
    SharedModule,
    ErrorsRoutingModule,
  ]
})
export class ErrorsModule { }
