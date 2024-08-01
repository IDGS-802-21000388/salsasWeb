export interface Producto {
  idProducto: number;
  nombreProducto: string;
  precioVenta: number;
  precioProduccion: number;
  cantidad: number;
  idMedida?: number;
  fotografia?: string;
  estatus: boolean;
}
