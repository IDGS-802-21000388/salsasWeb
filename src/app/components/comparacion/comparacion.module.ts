import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparacionComponent } from './comparacion/comparacion.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ComparacionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
  ]
})
export class ComparacionModule { }
