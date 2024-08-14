import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { ComprasFormComponent } from './compras-form/compras-form.component';
import { ComprasListComponent } from './compras-list/compras-list.component';
import { DetalleComprasComponent } from './detalle-compras/detalle-compras.component';

@NgModule({
  declarations: [
    ComprasFormComponent,
    ComprasListComponent,
    DetalleComprasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginator,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    RouterLink,
    FontAwesomeModule,
    MatDialogModule,
    MatPaginatorModule,
    SweetAlert2Module.forRoot()
  ],
  exports :[
    ComprasFormComponent,
    ComprasListComponent,
    DetalleComprasComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComprasModule { }
