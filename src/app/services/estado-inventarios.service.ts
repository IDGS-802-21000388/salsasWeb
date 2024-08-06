import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventarioReporte } from '../interfaces/InventarioReporte';
@Injectable({
  providedIn: 'root'
})
export class EstadoInventariosService {
  private apiUrl = 'https://localhost:7215/api/InventarioReporte';

  constructor(private http: HttpClient) {}

  getInventarioReportes(): Observable<InventarioReporte[]> {
    return this.http.get<InventarioReporte[]>(this.apiUrl);
  }

  getInventarioReporte(id: number): Observable<InventarioReporte> {
    return this.http.get<InventarioReporte>(`${this.apiUrl}/${id}`);
  }

  createInventarioReporte(inventarioReporte: InventarioReporte): Observable<InventarioReporte> {
    return this.http.post<InventarioReporte>(this.apiUrl, inventarioReporte);
  }

  updateInventarioReporte(id: number, inventarioReporte: InventarioReporte): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, inventarioReporte);
  }

  deleteInventarioReporte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
