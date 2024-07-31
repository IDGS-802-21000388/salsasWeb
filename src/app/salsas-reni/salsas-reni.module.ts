import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule
  ],
  exports: [
    NavBarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalsasReniModule { }
