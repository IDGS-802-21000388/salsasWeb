export interface Producto {
  idProducto: number;
  nombreProducto: string;
  precioVenta: number;
  precioProduccion: number;
  idMedida?: number;
  fotografia?: string;
  estatus: boolean;
}
