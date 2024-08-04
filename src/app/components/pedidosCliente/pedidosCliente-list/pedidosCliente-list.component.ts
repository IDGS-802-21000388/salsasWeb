import { Component, OnInit, ViewChild } from '@angular/core';
import { EnvioDetalleWeb } from '../../../interfaces/envioDetalle';
import { PedidoService } from '../../../services/pedido.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pedidosCliente-list',
  templateUrl: './pedidosCliente-list.component.html',
  styleUrls: ['./pedidosCliente-list.component.css']
})
export class PedidosClienteListComponent implements OnInit {
  displayedColumns: string[] = [
    'nombreCliente', 
    'domicilio', 
    'estatusEnvio', 
    'fechaEnvio', 
    'fechaEntregaEstimada', 
    'productos', 
    'total'
  ];
  dataSource = new MatTableDataSource<EnvioDetalleWeb>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(): void {
    const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const userID = user.idUsuario; 
    const userRole = user.rol.toLowerCase();

    this.pedidoService.GetPedidos().subscribe(
      (data: EnvioDetalleWeb[]) => {
        let filteredData: EnvioDetalleWeb[];

        switch (userRole) {
          case 'admin':
            filteredData = data; 
            break;
          default:
            filteredData = data.filter(pedido => pedido.idUsuario === userID);
        }
        this.dataSource.data = filteredData;

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      (error) => {
        console.error('Error al obtener pedidos', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
