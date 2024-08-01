import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; // Importar desde la ruta específica
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar desde la ruta específica
import { MatButtonModule } from '@angular/material/button'; // Importar desde la ruta específica
import { MatCardModule } from '@angular/material/card'; // Importar desde la ruta específica
import { MatSelectModule } from '@angular/material/select'; // Importar desde la ruta específica
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog'; // Importar desde la ruta específica
import { MatPaginatorModule } from '@angular/material/paginator'; // Importar desde la ruta específica
import { MatTableModule } from '@angular/material/table'; // Importar el módulo de la tabla
import { MatIconModule } from '@angular/material/icon';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    UserFormComponent,
    UserListComponent
  ],
  imports: [
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
  ],
  exports: [
    UserFormComponent,
    UserListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsuarioModule { }
