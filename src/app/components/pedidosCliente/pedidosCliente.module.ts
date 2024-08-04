import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PedidosClienteListComponent } from './pedidosCliente-list/pedidosCliente-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    PedidosClienteListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    FormsModule 
  ],
  exports:[
    PedidosClienteListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PedidosClienteModule { }
