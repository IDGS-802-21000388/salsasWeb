import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleVentum } from '../interfaces/ventaCompleta';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentumService {
  private apiUrl = 'http://localhost:7215/api/DetalleVentum';

  constructor(private http: HttpClient) {}

  getDetallesVenta(): Observable<DetalleVentum[]> {
    return this.http.get<DetalleVentum[]>(this.apiUrl);
  }

  getDetalleVenta(id: number): Observable<DetalleVentum> {
    return this.http.get<DetalleVentum>(`${this.apiUrl}/${id}`);
  }

  createDetalleVenta(detalleVenta: DetalleVentum): Observable<DetalleVentum> {
    return this.http.post<DetalleVentum>(this.apiUrl, detalleVenta);
  }

  updateDetalleVenta(id: number, detalleVenta: DetalleVentum): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, detalleVenta);
  }

  deleteDetalleVenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
