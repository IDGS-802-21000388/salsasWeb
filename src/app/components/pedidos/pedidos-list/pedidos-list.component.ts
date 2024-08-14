import { Component, OnInit, ViewChild } from '@angular/core';
import { EnvioDetalleWeb } from '../../../interfaces/envioDetalle';
import { PedidoService } from '../../../services/pedido.service';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { SolicitudProduccionService } from '../../../services/solicitud-produccion.service'; // Asegúrate de tener este servicio
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from '../../../services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { PedidoDetalleModalComponent } from '../pedido-detalle-modal-component/pedido-detalle-modal-component.component';

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
    'total',
    'acciones'
  ];
  dataSource = new MatTableDataSource<EnvioDetalleWeb>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private pedidoService: PedidoService,
    private materiaPrimaService: MateriaPrimaService,
    private solicitudProduccionService: SolicitudProduccionService, // Asegúrate de tener este servicio
    private alertService: AlertService,
    public dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(): void {
    const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const userRole = user.rol.toLowerCase(); 

    this.pedidoService.GetPedidos().subscribe(
      (data: EnvioDetalleWeb[]) => {
        let filteredData: EnvioDetalleWeb[];

        switch (userRole) {
          case 'admin':
            filteredData = data; 
            break;
          case 'empleado':
            filteredData = data.filter(pedido => pedido.estatusEnvio.toLowerCase() === 'pendiente'
          || pedido.estatusEnvio.toLowerCase() === 'en producción');
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
        this.alertService.error('Error al obtener los pedidos. Por favor, intente nuevamente.');
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

  openModal(row: EnvioDetalleWeb): void {
    const dialogRef = this.dialog.open(PedidoDetalleModalComponent, {
      width: '400px',
      data: { detalle: row } // Pasar los detalles del pedido al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }
  
  actualizarEstatus(idEnvio: number): void {
    const envio = this.dataSource.data.find(pedido => pedido.idEnvio === idEnvio);
    if (!envio) {
      console.error('No se encontró el envío con el id proporcionado');
      this.alertService.error('No se encontró el envío con el ID proporcionado.');
      return;
    }
  
    let nuevoEstatus = '';
    switch (envio.estatusEnvio.toLowerCase()) {
      case 'pendiente':
        nuevoEstatus = 'en producción';
        break;
      case 'en producción':
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
        this.alertService.error('Estatus desconocido. No se puede actualizar.');
        return;
    }
  
    this.alertService.confirm(`¿Estás seguro de que quieres cambiar el estatus a ${nuevoEstatus}?`).then(result => {
      if (result.isConfirmed) {
        console.log('Actualizando estatus del pedido:', { idEnvio, nuevoEstatus });
  
        // Primero, actualizar el estatus del pedido
        this.pedidoService.actualizarEstatus(idEnvio, nuevoEstatus).subscribe(
          response => {
            console.log('Estatus actualizado:', response);
  
            // Solo llamar a descontarMateriaPrima si el nuevo estatus es "en producción" y el anterior era "pendiente"
            if (envio.estatusEnvio.toLowerCase() === 'pendiente' && nuevoEstatus === 'en producción') {
              console.log('Descontando materia prima para el envío:', idEnvio);
  
              this.materiaPrimaService.descontarMateriaPrima(idEnvio).subscribe(
                response => {
                  console.log('Materia prima descontada con éxito.', response);
                  this.alertService.success('Materia prima descontada con éxito.');
  
                  // Insertar solicitud de producción
                  this.solicitudProduccionService.createSolicitudProduccion({
                    idSolicitud: 0, // Asume que el ID se asignará automáticamente en el backend
                    fechaSolicitud: new Date(),
                    estatus: 1, // Asume que 1 es el valor predeterminado para estatus
                    idUsuario: envio.idUsuario, // O ajusta según la lógica de tu aplicación
                    idVenta: envio.idVenta
                  }).subscribe(
                    () => {
                      console.log('Solicitud de producción insertada con éxito.');
                      this.alertService.success('Solicitud de producción insertada con éxito.');
  
                      // Actualizar el estatus del pedido después de descontar la materia prima
                      envio.estatusEnvio = nuevoEstatus;
                      this.getPedidos(); // Volver a cargar los pedidos actualizados
                    },
                    error => {
                      console.error('Error al insertar la solicitud de producción:', error);
                      this.alertService.error(`Error al insertar la solicitud de producción: ${error.message || 'Mensaje de error no disponible'}`);
  
                      // Si ocurre un error al insertar la solicitud, revertir el estatus
                      this.pedidoService.actualizarEstatus(idEnvio, 'pendiente').subscribe(
                        () => {
                          console.log('Estatus revertido a pendiente debido al error en la solicitud de producción.');
                          this.getPedidos(); // Volver a cargar los pedidos actualizados
                        },
                        revertError => {
                          console.error('Error al revertir el estatus:', revertError);
                          this.alertService.error('Error al revertir el estatus del pedido.');
                        }
                      );
                    }
                  );
                },
                error => {
                  console.error('Error al descontar materia prima:', error);
                  this.alertService.error(`Error al descontar materia prima: ${error.message || 'Mensaje de error no disponible'}`);
  
                  // Si ocurre un error al descontar, revertir el estatus
                  this.pedidoService.actualizarEstatus(idEnvio, 'pendiente').subscribe(
                    () => {
                      console.log('Estatus revertido a pendiente debido al error en la descontación.');
                      this.getPedidos(); // Volver a cargar los pedidos actualizados
                    },
                    revertError => {
                      console.error('Error al revertir el estatus:', revertError);
                      this.alertService.error('Error al revertir el estatus del pedido.');
                    }
                  );
                }
              );
            } else {
              // Si el estatus no es "pendiente" o no se está actualizando a "en producción", simplemente actualizamos la vista
              envio.estatusEnvio = nuevoEstatus;
              this.getPedidos(); // Volver a cargar los pedidos actualizados
            }
          },
          error => {
            console.error('Error al actualizar el estatus:', error);
            this.alertService.error(`Error al actualizar el estatus: ${error.error.message || error.message}`);
          }
        );
      }
    });
    
  }
}
