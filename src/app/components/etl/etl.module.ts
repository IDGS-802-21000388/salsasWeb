import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatGridListModule } from '@angular/material/grid-list';
import { BaseChartDirective } from 'ng2-charts';
import { EstadoInventariosComponent } from './estado-inventarios/estado-inventarios.component';
import { VentasComponent } from './ventas/ventas.component';
import { ClientesRankingComponent } from './clientes-ranking/clientes-ranking.component';



@NgModule({
  declarations: [
    EstadoInventariosComponent,
    VentasComponent,
    ClientesRankingComponent
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
    MatSelectModule,
    RouterLink,
    FontAwesomeModule,
    MatDialogModule,
    MatPaginatorModule,
    SweetAlert2Module.forRoot(),
    MatCardModule,
    MatGridListModule,
    BaseChartDirective
  ],
  exports: [
    EstadoInventariosComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ETLModule { }
