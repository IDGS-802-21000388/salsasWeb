export interface MateriaPrima {
  idMateriaPrima: number;
  nombreMateria: string;
  precioCompra: number;
  cantidad: number;
  idMedida: number;
  idProveedor: number;
}

export interface Compra {
  idCompra: number;
  idMateriaPrima: number;
  idDetalleMateriaPrima: number;
  cantidadExistentes: number;
}

export interface DetalleMateriaPrima {
  idDetalleMateriaPrima: number;
  fechaCompra: Date;
  fechaVencimiento: Date;
  cantidadExistentes: number;
  estatus: number;
  idMateriaPrima: number;
  porcentaje: number;
}

export interface Medida {
  idMedida: number;
  tipoMedida: string;
}

export interface MermaInventario {
  idMerma: number;
  cantidadMerma: number;
  fechaMerma: Date;
  idMateriaPrima: number;
  idDetalleMateriaPrima: number;
  idDetalleMateriaPrimaNavigation: DetalleMateriaPrima;
  idMateriaPrimaNavigation: string | MateriaPrima;
}
