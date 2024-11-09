import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoModalComponent } from './producto-modal/producto-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí





@NgModule({
  declarations: [
    ProductoModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductoModalModule { }
