export interface Producto {
  idProducto: number;
  nombreProducto: string;
  precioVenta: number;
  precioProduccion: number;
  cantidad: number;
  idMedida?: number;
  fotografia?: string;
  estatus: boolean;
  isCaja?: boolean; // Agregamos esta propiedad

}

// Es para adaptar el LocalStore
export interface CartItem {
  producto: Producto;
  cantidad: number;
}

