import { Paqueterium } from "./paqueterium";
import { Venta } from "./ventaCompleta";

export interface Envio {
    idEnvio: number;
    fechaEnvio: Date;
    fechaEntregaEstimada?: Date;
    fechaEntregaReal?: Date;
    estatus: string;
    idVenta?: number;
    idPaqueteria?: number;
    idPaqueteriaNavigation?: Paqueterium;
    idVentaNavigation?: Venta;
  }
  