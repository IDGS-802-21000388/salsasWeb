
  
  export interface Venta {
    idVenta?: number; // Este campo es opcional cuando se crea una nueva venta
    fechaVenta: Date;
    total: number;
    idUsuario: number;
  }
  
  export interface Pago {
    idPago?: number; // Este campo es opcional cuando se crea un nuevo pago
    fechaPago: Date;
    monto: number;
    metodoPago: string;
    idVenta: number;
  }
  
  export interface Tarjetum {
    idTarjeta?: number; // Este campo es opcional cuando se crea una nueva tarjeta
    numeroTarjeta: string;
    nombreTitular: string;
    fechaExpiracion: string; // Formato MM/AA
    cvv: string;
    idPago?: number; // Este campo es opcional cuando se crea una nueva tarjeta
  }
  
  export interface DetalleVentum {
    idDetalleVenta?: number; // Este campo es opcional cuando se crea un nuevo detalle de venta
    cantidad: number;
    subtotal: number;
    idVenta?: number;
    idProducto: number;
  }
  