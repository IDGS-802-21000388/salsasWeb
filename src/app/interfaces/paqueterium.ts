import { Envio } from "./envio";

export interface Paqueterium {
    idPaqueteria: number;
    nombrePaqueteria: string;
    telefono: string;
    direccion: string;
    estatus: number;
    envios?: Envio[];
  }
  