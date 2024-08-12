export interface SolicitudProduccion {
  idSolicitud: number;
  fechaSolicitud: Date;
  estatus: number;
  idUsuario?: number;  // Opcional, porque puede ser null
  idVenta?: number;    // Opcional, porque puede ser null
  // Puedes agregar propiedades adicionales si es necesario para los datos que se devuelven en la API
}
