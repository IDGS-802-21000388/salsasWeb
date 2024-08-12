import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../interfaces/ventaCompleta';

@Injectable({
  providedIn: 'root'
})
export class VentumService {
  private apiUrl = 'https://localhost:7215/api/Ventum';

  constructor(private http: HttpClient) {}

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  getVenta(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/${id}`);
  }

  createVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, venta);
  }

  updateVenta(id: number, venta: Venta): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, venta);
  }

  deleteVenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
