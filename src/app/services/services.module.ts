import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterService} from "@app/services/register.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    RegisterService
  ]
})
export class ServicesModule { }
