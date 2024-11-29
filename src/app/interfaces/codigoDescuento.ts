export interface CodigoDescuento {
    idCodigo: number;
    codigo: string;
    descripcion: string;
    descuentoPorcentaje?: number;
    descuentoMonto?: number;
    fechaInicio: Date;
    fechaFin: Date;
    cantidadMaxima?: number;
    cantidadUsada: number;
    estatus: boolean;
    usuarioCodigoDescuentos?: UsuarioCodigoDescuento[]; // Relación opcional
  }
  
  export interface UsuarioCodigoDescuento {
    idUsuarioCodigo: number;
    idUsuario: number;
    idCodigo: number;
    fechaAsignacion: Date;
    usado: boolean;
    codigoDescuento?: CodigoDescuento; // Relación opcional
  }
  