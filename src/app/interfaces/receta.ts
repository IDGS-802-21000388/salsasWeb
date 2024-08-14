export interface Medida {
  idMedida: number;
  tipoMedida: string;
}

export interface Producto {
  idProducto: number;
  nombreProducto: string;
  precioVenta: number;
  precioProduccion: number;
  cantidad : number;
  idMedida?: number;
  fotografia?: string;
  estatus: boolean;
}

export interface Receta {
  idReceta: number;
  idMedida?: number;
  idProducto?: number;
}

export interface DetalleReceta {
  idProducto: number;
  idMateriaPrima: number;
  nombreMateria: string;
  cantidad: number;
  stock: number;
  idMedida: number;
  medidaProducto: string;
  idReceta: number;
}

export interface MateriaPrima {
  idMateriaPrima: number;
  nombreMateria: string;
  precioCompra: number;
  cantidad: number;
  idMedida?: number;
  idProveedor?: number;
}

export interface MateriaPrimaDetalle {
  idMateriaPrima: number;
  nombreMateria: string;
  tipoMedida: string;
}

