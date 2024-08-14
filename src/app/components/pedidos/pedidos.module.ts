import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { PedidoDetalleModalComponent } from './pedido-detalle-modal-component/pedido-detalle-modal-component.component';


@NgModule({
  declarations: [
    PedidosListComponent,
    PedidoDetalleModalComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule
  ],
  exports:[
    PedidosListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PedidosModule { }
