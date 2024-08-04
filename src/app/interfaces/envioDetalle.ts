export interface EnvioDetalleWeb {
    idEnvio: number;
    idUsuario: number;
    nombreCliente: string;
    domicilio: string;
    estatusEnvio: string;
    fechaEnvio: string; // Usualmente se utiliza el tipo 'string' para fechas en formatos específicos
    fechaEntregaEstimada: string; // Igual que arriba
    productos: string;
    total: number; // Utiliza 'number' en lugar de 'double'
}
