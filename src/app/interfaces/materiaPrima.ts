export interface MateriaPrima {
    idMateriaPrima: number;
    nombreMateria: string;
    precioCompra: number;
    cantidad: number;
    idMedida: number;
    idProveedor: number;
  }
  
  export interface DetalleMateriaPrima {
    idDetalle_materia_prima: number;
    fechaCompra: Date;
    fechaVencimiento: Date;
    cantidadExistentes: number;
    estatus: number;
    idMateriaPrima: number;
    porcentaje: number;
  }