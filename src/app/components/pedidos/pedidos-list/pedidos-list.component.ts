import { Component, OnInit, ViewChild } from '@angular/core';
import { EnvioDetalleWeb } from '../../../interfaces/envioDetalle';
import { PedidoService } from '../../../services/pedido.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from '../../../services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { PedidoDetalleModalComponent } from '../pedido-detalle-modal-component/pedido-detalle-modal-component.component';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { SolicitudProduccionService } from '../../../services/solicitud-produccion.service';
import { SolicitudProduccion } from '../../../interfaces/solicitudProduccion';

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
    private solicitudProduccionService: SolicitudProduccionService,
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
      data: { detalle: row }
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
    let mensajeConfirmacion = '';

    switch (envio.estatusEnvio.toLowerCase()) {
      case 'pendiente':
        nuevoEstatus = 'en producción';
        mensajeConfirmacion = '¿Estás seguro de que quieres cambiar el estatus a en producción?';
        break;
      case 'en producción':
        nuevoEstatus = 'pendiente de envío';
        mensajeConfirmacion = '¿Estás seguro de que quieres cambiar el estatus a pendiente de envío?';
        break;
      case 'pendiente de envío':
        nuevoEstatus = 'en tránsito';
        mensajeConfirmacion = '¿Estás seguro de que quieres cambiar el estatus a en tránsito?';
        break;
      case 'en tránsito':
        nuevoEstatus = 'entregado';
        mensajeConfirmacion = '¿Estás seguro de que quieres cambiar el estatus a entregado?';
        break;
      default:
        console.error('Estatus desconocido:', envio.estatusEnvio);
        this.alertService.error('Estatus desconocido. No se puede actualizar.');
        return;
    }

    this.alertService.confirm(mensajeConfirmacion).then(result => {
      if (result.isConfirmed) {
        console.log('Actualizando estatus del pedido:', { idEnvio, nuevoEstatus });

        if (envio.estatusEnvio.toLowerCase() === 'pendiente' && nuevoEstatus === 'en producción') {
          console.log('Consultando y descontando productos para el envío:', idEnvio);

          this.materiaPrimaService.descontarProductos(idEnvio).subscribe(
            response => {
              if (response && response.text) {
                console.log('Productos descontados con éxito.', response);
                this.alertService.success('Productos descontados con éxito.');

                // Crear la solicitud de producción después de descontar los productos
                const solicitudProduccion: SolicitudProduccion = {
                  idSolicitud:0,
                  fechaSolicitud: new Date(),
                  estatus: 1, // Estatus inicial de la solicitud
                  idUsuario: envio.idUsuario,
                  idVenta: envio.idVenta
                };

                this.solicitudProduccionService.createSolicitudProduccion(solicitudProduccion).subscribe(
                  () => {
                    console.log('Solicitud de producción creada con éxito.');
                    this.alertService.success('Solicitud de producción creada con éxito.');

                    // Actualizar el estatus del pedido a "pendiente de envío"
                    this.pedidoService.actualizarEstatus(idEnvio, 'pendiente de envío').subscribe(
                      () => {
                        console.log('Estatus actualizado a pendiente de envío.');
                        this.getPedidos(); // Volver a cargar los pedidos actualizados
                      },
                      error => {
                        console.error('Error al actualizar el estatus:', error);
                        this.alertService.error(`Error al actualizar el estatus: ${error.error.message || 'Mensaje de error no disponible'}`);
                      }
                    );
                  },
                  error => {
                    console.error('Error al crear la solicitud de producción:', error);
                    this.alertService.error('Error al crear la solicitud de producción.');
                  }
                );

              } else {
                this.alertService.error('No hay suficiente stock para el envío.');

                this.pedidoService.actualizarEstatus(idEnvio, 'pendiente').subscribe(
                  () => {
                    console.log('Estatus revertido a pendiente debido a falta de stock.');
                    this.getPedidos();
                  },
                  revertError => {
                    console.error('Error al revertir el estatus:', revertError);
                    this.alertService.error('Error al revertir el estatus del pedido.');
                  }
                );
              }
            },
            error => {
              console.error('Error al descontar productos:', error);
              this.alertService.error(`Error al descontar productos: ${error.message || 'Mensaje de error no disponible'}`);

              this.pedidoService.actualizarEstatus(idEnvio, 'pendiente').subscribe(
                () => {
                  console.log('Estatus revertido a pendiente debido al error en la descontación.');
                  this.getPedidos();
                },
                revertError => {
                  console.error('Error al revertir el estatus:', revertError);
                  this.alertService.error('Error al revertir el estatus del pedido.');
                }
              );
            }
          );
        } else {
          this.pedidoService.actualizarEstatus(idEnvio, nuevoEstatus).subscribe(
            () => {
              console.log(`Estatus actualizado a ${nuevoEstatus}.`);
              this.getPedidos();
            },
            error => {
              console.error('Error al actualizar el estatus:', error);
              this.alertService.error(`Error al actualizar el estatus: ${error.error.message || 'Mensaje de error no disponible'}`);
            }
          );
        }
      }
    });
  }
}
