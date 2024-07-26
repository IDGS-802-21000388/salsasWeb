import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaPrimaFormComponent } from './materia-prima-form/materia-prima-form.component';
import { MateriaPrimaListComponent } from './materia-prima-list/materia-prima-list.component';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    MateriaPrimaFormComponent,
    MateriaPrimaListComponent
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
  exports :[
    MateriaPrimaFormComponent,
    MateriaPrimaListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MateriaPrimaModule { }
