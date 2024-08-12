import { Usuario } from './usuario'; 

export interface RankingClientes {
    id: number;
    idUsuario: number;
    nombreUsuario: string;
    comprasTotales: number; 
    productosComprados: string; 
    ultimaActualizacion: Date;
    usuario: Usuario | null; 
}

