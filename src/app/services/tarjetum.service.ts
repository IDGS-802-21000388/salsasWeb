import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarjetum } from '../interfaces/ventaCompleta';

@Injectable({
  providedIn: 'root'
})
export class TarjetumService {
  private apiUrl = 'https://localhost:7215/api/Tarjetum';

  constructor(private http: HttpClient) {}

  getTarjetas(): Observable<Tarjetum[]> {
    return this.http.get<Tarjetum[]>(this.apiUrl);
  }

  getTarjeta(id: number): Observable<Tarjetum> {
    return this.http.get<Tarjetum>(`${this.apiUrl}/${id}`);
  }

  createTarjeta(tarjeta: Tarjetum): Observable<Tarjetum> {
    return this.http.post<Tarjetum>(this.apiUrl, tarjeta);
  }

  updateTarjeta(id: number, tarjeta: Tarjetum): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, tarjeta);
  }

  deleteTarjeta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
