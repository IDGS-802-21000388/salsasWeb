import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopBarModule } from '../top-bar/top-bar.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DireccionFormComponent } from './direccion-form/direccion-form.component';
import { ComprobanteComponent } from './comprobante/comprobante.component';


@NgModule({
  declarations: [
    DetalleVentaComponent,
    DireccionFormComponent,
    ComprobanteComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    TopBarModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    RouterModule,
    FontAwesomeModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule, // Importa el módulo de la tabla
    MatIconModule,
    SweetAlert2Module.forRoot() 
  ], exports:
  [DetalleVentaComponent,
    DireccionFormComponent,
     ComprobanteComponent
  ]
  ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetalleVentaModule { }
