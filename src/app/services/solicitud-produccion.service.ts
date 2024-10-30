import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { SolicitudProduccion } from '../interfaces/solicitudProduccion';

@Injectable({
  providedIn: 'root'
})
export class SolicitudProduccionService {

  private apiUrl = `http://localhost:7215/api/solicitudesproduccion`; // Ajusta el endpoint según la configuración de tu API

  constructor(private http: HttpClient) { }

  // Método para crear una nueva solicitud de producción
  createSolicitudProduccion(solicitud: SolicitudProduccion): Observable<SolicitudProduccion> {
    return this.http.post<SolicitudProduccion>(this.apiUrl, solicitud);
  }
}
