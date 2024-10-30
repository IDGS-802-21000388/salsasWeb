import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleMateriaPrima } from '../interfaces/detalleMateriaPrima';

@Injectable({
  providedIn: 'root'
})
export class DetalleMateriaPrimaService {
  private apiUrl = 'http://localhost:7215/api/DetalleMateriaPrima';

  constructor(private http: HttpClient) {}

  getDetalleMateriasPrimas(): Observable<DetalleMateriaPrima[]> {
    return this.http.get<DetalleMateriaPrima[]>(this.apiUrl);
  }

  getDetalleMateriaPrima(id: number): Observable<DetalleMateriaPrima> {
    return this.http.get<DetalleMateriaPrima>(`${this.apiUrl}/${id}`);
  }

  getDetalleMateriaPrimaByMateriaPrimaId(idMateriaPrima: number): Observable<DetalleMateriaPrima> {
    return this.http.get<DetalleMateriaPrima>(`${this.apiUrl}/byMateriaPrima/${idMateriaPrima}`);
  }

  createDetalleMateriaPrima(detalleMateriaPrima: DetalleMateriaPrima): Observable<DetalleMateriaPrima> {
    return this.http.post<DetalleMateriaPrima>(this.apiUrl, detalleMateriaPrima);
  }

  updateDetalleMateriaPrima(id: number, detalleMateriaPrima: DetalleMateriaPrima): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, detalleMateriaPrima);
  }

  deleteDetalleMateriaPrima(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activateDetalleMateriaPrima(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/activate/${id}`, null);
  }

  updateCantidadExistente(id: number, cantidadExistente: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/detalle`, cantidadExistente);
  }
}
