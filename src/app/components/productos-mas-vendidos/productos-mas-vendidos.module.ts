import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { ProductosMasVendidosComponent } from './productos-mas-vendidos/productos-mas-vendidos.component';


@NgModule({
  declarations: [
    ProductosMasVendidosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule
  ],
  exports: [
    ProductosMasVendidosComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductosMasVendidosModule { }
