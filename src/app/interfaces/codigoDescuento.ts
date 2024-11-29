export interface CodigoDescuento {
  idCodigo: number;
  codigo: string;
  descripcion: string;
  descuentoPorcentaje: number;
  descuentoMonto: number | null;
  fechaInicio: string;
  fechaFin: string;
  cantidadMaxima: number | null;
  cantidadUsada: number;
  estatus: boolean;
}

export interface UsuarioCodigoDescuento {
  idUsuarioCodigo: number;
  idUsuario: number;
  idCodigo: number;
  fechaAsignacion: string;
  usado: boolean;
}

export interface DatosTablas {
  codigosDescuento: CodigoDescuento[];
  usuarioCodigoDescuento: UsuarioCodigoDescuento[];
}

export interface ModificarEstatusParams {
  idCodigo: number;
  nuevoEstatusCodigo: boolean | null;
  idUsuarioCodigo: number | null;
  nuevoEstatusUsuarioCodigo: boolean | null;
}

  