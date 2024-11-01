import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { CartItem, Producto } from '../../../interfaces/productos';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/user.service';
import { DireccionFormComponent } from '../direccion-form/direccion-form.component';
import { EncuestaSatisfaccion } from '../../../interfaces/encuesta-satisfaccion';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GeocodingService } from '../../../services/geocoding.service';
import {
  DetalleVentum,
  Pago,
  Tarjetum,
  Venta,
} from '../../../interfaces/ventaCompleta';
import { VentumService } from '../../../services/ventum.service';
import { DetalleVentumService } from '../../../services/detalle-ventum.service';
import { Envio } from '../../../interfaces/envio';
import { PagoService } from '../../../services/pago.service';
import { TarjetumService } from '../../../services/tarjetum.service';
import { EnvioService } from '../../../services/envio.service';
import { EncuestaSatisfaccionComponent } from '../../landing-page/encuesta-satisfaccion/encuesta-satisfaccion.component';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css'],
})
export class DetalleVentaComponent implements OnInit {
  showAddressConfirmation: boolean = false;
  showPaymentMethod: boolean = false;
  showProductReview: boolean = false;
  ComborbanteCompra: boolean = false;
  showResumen: boolean = true;
  Pago: boolean = false;
  showCvvHelp: boolean = false;
  isVisa: boolean = false;
  isMastercard: boolean = false;
  fechaEntrega: string = '';
  productsGrouped: any[] = [];
  isModalOpen = false;
  usuarios: Usuario[] = [];
  totalProducts = 0;
  loggedUserId = 0;
  totalRepeatedProducts = 0;
  cantidadLitros = 0;

  dataSource = new MatTableDataSource<Usuario>();

  tarjeta: any = {
    numeroTarjeta: '',
    nombreTitular: '',
    fechaExpiracion: '',
    cvv: '',
  };
  envio: any = {
    direccion: '',
    fechaEstimada: '',
  };
  venta: any = {
    id: 0,
    fecha: new Date(),
    total: 0,
  };
  detalles: DetalleVentum[] = [];

  cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
  loggedUser: Usuario | undefined;
  subtotal: number = 0;
  costoEnvio: number = 50;
  iva: number = 0;
  total: number = 0;

  latitude: number = 19.4326;
  longitude: number = -99.1332;
  zoom: number = 30;

  map: google.maps.Map | undefined;
  marker: google.maps.Marker | undefined;

  constructor(
    private usuarioService: UsuariosService,
    private alertService: AlertService,
    private router: Router,
    private dialog: MatDialog,
    private geocodingService: GeocodingService,
    private ventaService: VentumService,
    private detalleVenta: DetalleVentumService,
    private pagoService: PagoService,
    private tarjetaService: TarjetumService,
    private envioService: EnvioService
  ) {}

  ngOnInit(): void {
    const loggedUserJson = localStorage.getItem('loggedUser');
    if (!loggedUserJson) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartItems.length === 0) {
      this.alertService.error(
        'El carrito está vacío. No se puede proceder con la compra.'
      );
      this.router.navigate(['/']);
      return;
    }

    this.loggedUserId = JSON.parse(loggedUserJson).idUsuario;
    this.usuarioService.getUsers().subscribe((users) => {
      this.loggedUser = users.find(
        (user) => user.idUsuario === this.loggedUserId
      );
      if (!this.loggedUser) {
        this.router.navigate(['/login']);
      } else {
        this.updateSummary();
        this.latitude = 21.1564112 || this.latitude;
        this.longitude = -101.6954442 || this.longitude;
        this.initializeMap();
        this.loadUsers();
      }
    });

    const today = new Date();
    let deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 2);
    this.fechaEntrega = deliveryDate.toLocaleDateString();

    this.countTotalProducts();
  }

  initializeMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: this.zoom,
    };
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );
  }

  loadUsers(): void {
    this.usuarioService.getUsers().subscribe((users) => {
      const loggedUserId = this.loggedUser?.idUsuario;
      this.loggedUser = users.find((user) => user.idUsuario === loggedUserId);
      if (this.loggedUser) {
        this.updateMap(this.loggedUser.direccion);
      }
    });
  }

  modifyAddress(): void {
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(DireccionFormComponent, {
      width: '600px',
      data: { usuario: this.loggedUser },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isModalOpen = false;
      if (result) {
        this.usuarioService.getUsers().subscribe((users) => {
          const loggedUserId = this.loggedUser?.idUsuario;
          this.loggedUser = users.find(
            (user) => user.idUsuario === loggedUserId
          );
          if (this.loggedUser) {
            this.alertService.success(
              'La dirección ha sido actualizada exitosamente.',
              'Dirección Actualizada'
            );
            this.resetMap();
            this.updateMap(this.loggedUser.direccion);
          }
        });
      }
    });
  }

  resetMap(): void {
    if (this.map) {
      if (this.marker) {
        this.marker.setMap(null);
        this.marker = undefined;
      }
      this.map = undefined;
    }
    this.initializeMap();
  }

  updateMap(direccion: any): void {
    const fullAddress = `${direccion.calle} ${direccion.numExt}, ${direccion.colonia}, ${direccion.municipio}, ${direccion.estado}, ${direccion.codigoPostal}`;
    console.log('Dirección completa:', fullAddress);
    this.geocodingService.getCoordinates(fullAddress).subscribe(
      (response) => {
        console.log('Respuesta de Geocodificación:', response);
        if (response.results.length > 0) {
          const location = response.results[0].geometry.location;
          this.latitude = location.lat;
          this.longitude = location.lng;

          if (this.map) {
            this.marker = new google.maps.Marker({
              position: { lat: this.latitude, lng: this.longitude },
              map: this.map,
              title: 'Ubicación actual',
            });
          }
        } else {
          this.alertService.error('No se pudo encontrar la ubicación.');
        }
      },
      (error) => {
        console.error('Error al geocodificar:', error);
      }
    );
  }

  countTotalProducts() {
    this.totalProducts = this.cartItems.reduce((total, item) => total + 1, 0);
  }

  onCardNumberInput(): void {
    this.tarjeta.numeroTarjeta = this.tarjeta.numeroTarjeta
      .replace(/\D/g, '')
      .slice(0, 16);
    const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardPattern = /^5[1-5][0-9]{14}$/;
    const cardNumber = this.tarjeta.numeroTarjeta.replace(/\s+/g, '');

    if (cardNumber.length > 16) {
      this.tarjeta.numeroTarjeta = cardNumber.slice(0, 16);
    }

    if (visaPattern.test(this.tarjeta.numeroTarjeta)) {
      this.isVisa = true;
      this.isMastercard = false;
    } else if (mastercardPattern.test(this.tarjeta.numeroTarjeta)) {
      this.isVisa = false;
      this.isMastercard = true;
    } else {
      this.isVisa = false;
      this.isMastercard = false;
    }
  }

  onlyAllowNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onlyAllowLettersAndSpace(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (
      (charCode < 65 || (charCode > 90 && charCode < 97) || charCode > 122) && // Letras
      charCode !== 32 // Espacio
    ) {
      event.preventDefault();
    }
  }

  updateQuantity(item: Producto): void {
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem.producto.idProducto === item.idProducto
    );
    if (index !== -1) {
      this.cartItems[index].cantidad = item.cantidad;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.updateSummary();
      this.countTotalProducts();
    }
  }

  removeFromCart(idProducto: number): void {
    this.cartItems = this.cartItems.filter(
      (cartItem: CartItem) => cartItem.producto.idProducto !== idProducto
    );
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.updateSummary();
  }

  updateSummary(): void {
    this.subtotal = this.cartItems.reduce(
      (total, item) => total + item.producto.precioVenta * item.cantidad,
      0
    );
    this.iva = this.subtotal * 0.16;
    this.total = this.subtotal + this.costoEnvio + this.iva;
  }

  confirmAddress(): void {
    this.showAddressConfirmation = true;
    this.showPaymentMethod = false;
    this.showProductReview = false;
  }

  changeAddress(): void {
    this.showAddressConfirmation = false;
    this.showPaymentMethod = false;
    this.showProductReview = false;
  }

  changePaymentMethod(): void {
    this.showAddressConfirmation = true;
    this.showPaymentMethod = false;
    this.showProductReview = false;
  }

  confirmPaymentMethod(): void {
    this.showPaymentMethod = true;
    this.showProductReview = true;
    this;
    this.Pago = true;
  }

  confirmProductReview(): void {
    this.showAddressConfirmation = false;
    this.showPaymentMethod = false;
    this.showProductReview = true;
  }

  toggleCvvHelp(): void {
    this.showCvvHelp = !this.showCvvHelp;
  }

  CompraConfirmada() {
    const venta: Venta = {
      idVenta: 0,
      fechaVenta: new Date(),
      total: this.total,
      idUsuario: this.loggedUserId,
    };
    this.createVenta(venta);
  }

  private createVenta(venta: Venta): void {
    this.ventaService.createVenta(venta).subscribe(
      (createdVenta: Venta) => {
        let detalleVentaCreado: boolean = false;
        let envioCreado: boolean = false;
        let pagoCreado: boolean = false;
        let tarjetaCreada: boolean = false;

        this.cartItems.forEach((item) => {
          let litrosPorProducto: number;

          switch (item.producto.cantidad) {
            case 250:
              litrosPorProducto = item.cantidad * 0.25;
              break;
            case 600:
              litrosPorProducto = item.cantidad * 0.6;
              break;
            case 1:
              litrosPorProducto = item.cantidad * 1;
              break;
            case 3.5:
              litrosPorProducto = item.cantidad * 3.5;
              break;
            default:
              console.warn(
                `Litros no manejado para el producto ID ${item.producto.idProducto}`
              );
              litrosPorProducto = 0;
          }

          this.cantidadLitros += litrosPorProducto;
          const detalleVentum: DetalleVentum = {
            idDetalleVenta: 0,
            cantidad: item.cantidad,
            subtotal: this.subtotal,
            idVenta: createdVenta.idVenta,
            idProducto: item.producto.idProducto,
          };

          this.detalleVenta.createDetalleVenta(detalleVentum).subscribe(
            () => {
              detalleVentaCreado = true;
            },
            (error) => {
              this.alertService.error(
                `Error al crear el detalle de venta: ${
                  error.error.message || error.message
                }`
              );
              this.rollback(createdVenta.idVenta!);
            }
          );
        });

        const envio: Envio = {
          idEnvio: 0,
          fechaEnvio: new Date(),
          fechaEntregaEstimada: this.calcularFechaEstimada(
            this.cantidadLitros,
            new Date()
          ),
          fechaEntregaReal: new Date(),
          estatus: 'pendiente',
          idVenta: createdVenta.idVenta,
          idPaqueteria: 1,
        };

        this.envioService.createEnvio(envio).subscribe(
          () => {
            envioCreado = true;
          },
          (error) => {
            this.alertService.error(
              `Error al crear el envío: ${error.error.message || error.message}`
            );
            if (createdVenta.idVenta !== undefined) {
              this.rollback(createdVenta.idVenta);
            } else {
              this.alertService.error(
                'No se pudo obtener el ID de la venta para realizar el rollback.'
              );
            }
          }
        );

        const pago: Pago = {
          idPago: 0,
          fechaPago: new Date(),
          monto: this.total,
          metodoPago: 'Tarjeta',
          idVenta: createdVenta.idVenta ?? 0,
        };

        this.pagoService.createPago(pago).subscribe(
          (createdPago: Pago) => {
            pagoCreado = true;
            const tarjeta: Tarjetum = {
              idTarjeta: 0,
              numeroTarjeta: this.tarjeta.numeroTarjeta,
              nombreTitular: this.tarjeta.nombreTitular,
              fechaExpiracion: this.onExpirationDateInput(
                this.tarjeta.fechaExpiracion
              ),
              cvv: this.tarjeta.cvv,
              idPago: createdPago.idPago,
            };

            this.tarjetaService.createTarjeta(tarjeta).subscribe(
              () => {
                tarjetaCreada = true;
                this.alertService.success(
                  'La compra ha sido realizada exitosamente.',
                  'Compra Exitosa'
                );
                localStorage.removeItem('cartItems');
                this.router.navigate(['/']);
                //setTimeout(() => {
                //  window.location.reload();
                //}, 1500);
                this.isModalOpen = true;
                const dialogRef = this.dialog.open(
                  EncuestaSatisfaccionComponent,
                  {
                    width: '800px',
                    data: { usuario: this.loggedUser },
                  }
                );
                //this.router.navigate(['/comprobante'], { state: { venta: createdVenta, detalles: this.cartItems, pago: createdPago, envio: envio } });
              },
              (error) => {
                this.alertService.error(
                  `Error al crear la tarjeta: ${
                    error.error.message || error.message
                  }`
                );
                if (createdVenta.idVenta !== undefined) {
                  this.rollback(createdVenta.idVenta);
                } else {
                  this.alertService.error(
                    'No se pudo obtener el ID de la venta para realizar el rollback.'
                  );
                }
              }
            );
          },
          (error) => {
            this.alertService.error(
              `Error al crear el pago: ${error.error.message || error.message}`
            );
            if (createdVenta.idVenta !== undefined) {
              this.rollback(createdVenta.idVenta);
            } else {
              this.alertService.error(
                'No se pudo obtener el ID de la venta para realizar el rollback.'
              );
            }
          }
        );
      },
      (error) => {
        this.alertService.error(
          `Error al crear la venta: ${error.error.message || error.message}`
        );
      }
    );
  }

  private rollback(idVenta: number): void {
    this.ventaService.deleteVenta(idVenta).subscribe(
      () => {
        this.alertService.info('Se realizó un rollback exitoso.');
      },
      (error) => {
        this.alertService.error(
          'No se pudo realizar el rollback. Verifique el estado de los datos.',
          error.message
        );
      }
    );
  }

  onExpirationDateInput(fechaExpiracion: string): string {
    fechaExpiracion = fechaExpiracion.replace(/\D/g, '');

    if (fechaExpiracion.length > 4) {
      fechaExpiracion = fechaExpiracion.slice(0, 4);
    }

    if (fechaExpiracion.length >= 2) {
      fechaExpiracion = `${fechaExpiracion.slice(0, 2)}/${fechaExpiracion.slice(
        2
      )}`;
    }

    return fechaExpiracion;
  }

  calcularFechaEstimada(litros: number, fechaInicial: Date): Date {
    const minutosPorLitro = 45;
    const tiempoTotalEnMinutos = litros * minutosPorLitro;

    const fechaEstimada = new Date(fechaInicial);

    fechaEstimada.setMinutes(fechaEstimada.getMinutes() + tiempoTotalEnMinutos);

    return fechaEstimada;
  }

  onSubmit() {
    if (
      !this.tarjeta.numeroTarjeta ||
      !this.tarjeta.nombreTitular ||
      !this.tarjeta.fechaExpiracion ||
      !this.tarjeta.cvv
    ) {
      this.alertService.error(
        'Todos los campos de la tarjeta deben estar llenos.'
      );
      return;
    }

    if (this.cartItems.length === 0) {
      this.alertService.error(
        'El carrito está vacío. No se puede proceder con la compra.'
      );
      return;
    }
  }
}
