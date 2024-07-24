import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoListComponent } from './producto-list/producto-list.component';



@NgModule({
  declarations: [
    ProductoListComponent,
    ProductoFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    RouterLink,
    FontAwesomeModule,
    MatDialogModule,
    MatPaginatorModule,
    SweetAlert2Module.forRoot()

  ],
  exports: [
    ProductoListComponent,
    ProductoFormComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductoModule { }
