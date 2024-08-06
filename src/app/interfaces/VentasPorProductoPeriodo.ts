import { Producto } from './productos'; // Asegúrate de que la ruta sea correcta

export interface VentasPorProductoPeriodo {
    id: number;
    productoId: number;
    nombreProducto: string;
    periodoInicio: Date; // O string, dependiendo del formato que recibas
    periodoFin: Date; // O string, dependiendo del formato que recibas
    numeroVentas: number;
    cantidadVendida: number;
    totalRecaudado: number;
    indicadorGlobal: string;
    producto: Producto | null; // Puede ser null si el producto no está disponible
}
