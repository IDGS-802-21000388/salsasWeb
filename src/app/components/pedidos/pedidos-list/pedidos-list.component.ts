import { Component, OnInit, ViewChild } from '@angular/core';
import { EnvioDetalleWeb } from '../../../interfaces/envioDetalle'; // Ajusta la ruta según tu estructura de proyecto
import { PedidoService } from '../../../services/pedido.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit {
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

  constructor(
    private pedidoService: PedidoService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(): void {
    const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const userRole = user.rol.toLowerCase(); // Convertimos el rol a minúsculas para una comparación uniforme

    this.pedidoService.GetPedidos().subscribe(
      (data: EnvioDetalleWeb[]) => {
        let filteredData: EnvioDetalleWeb[];

        switch (userRole) {
          case 'admin':
            filteredData = data; // Todos los envíos para el admin
            break;
          case 'empleado':
            filteredData = data.filter(pedido => pedido.estatusEnvio.toLowerCase() === 'pendiente'); // Filtrar por estatus pendiente
            break;
          case 'repartidor':
            filteredData = data.filter(pedido => 
              pedido.estatusEnvio.toLowerCase() === 'pendiente de envío' || 
              pedido.estatusEnvio.toLowerCase() === 'en tránsito'
            ); 
            break;
          default:
            filteredData = [];
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

  actualizarEstatus(idEnvio: number): void {
    const envio = this.dataSource.data.find(pedido => pedido.idEnvio === idEnvio);
    if (!envio) {
      console.error('No se encontró el envío con el id proporcionado');
      return;
    }

    let nuevoEstatus = '';
    switch (envio.estatusEnvio.toLowerCase()) {
      case 'pendiente':
        nuevoEstatus = 'pendiente de envío';
        break;
      case 'pendiente de envío':
        nuevoEstatus = 'en tránsito';
        break;
      case 'en tránsito':
        nuevoEstatus = 'entregado';
        break;
      default:
        console.error('Estatus desconocido:', envio.estatusEnvio);
        return;
    }

    this.alertService.confirm(`¿Estás seguro de que quieres cambiar el estatus a ${nuevoEstatus}?`).then(result => {
      if (result.isConfirmed) {
        this.pedidoService.actualizarEstatus(idEnvio, nuevoEstatus).subscribe(
          response => {
            console.log('Estatus actualizado:', response);
            this.alertService.success('El estatus ha sido actualizado.');
            envio.estatusEnvio = nuevoEstatus;
            this.getPedidos();
          },
          error => {
            this.alertService.error(`Error al actualizar el estatus: ${error.error.message || error.message}`);
          }
        );
      }
    });
  }
}
