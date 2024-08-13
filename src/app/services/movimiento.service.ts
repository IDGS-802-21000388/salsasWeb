import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimiento } from '../interfaces/ventaCompleta';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private apiUrl = 'https://localhost:7215/api/Movimiento';

  constructor(private http: HttpClient) {}

  getMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.apiUrl);
  }

  getMovimiento(id: number): Observable<Movimiento> {
    return this.http.get<Movimiento>(`${this.apiUrl}/${id}`);
  }

  createMovimiento(movimiento: Movimiento): Observable<Movimiento> {
    return this.http.post<Movimiento>(this.apiUrl, movimiento);
  }

  updateMovimiento(id: number, movimiento: Movimiento): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, movimiento);
  }

  deleteMovimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
