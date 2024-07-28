import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasDistribuidasComponent } from './ventas-distribuidas/ventas-distribuidas.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    VentasDistribuidasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule
  ]
})
export class VentasDistribuidasModule { }
