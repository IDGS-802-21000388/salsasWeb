import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TopBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    TopBarComponent
  ]
})
export class TopBarModule { }
