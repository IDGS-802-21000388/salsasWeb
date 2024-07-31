import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from '../interfaces/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = 'https://localhost:7215/api/Compra';

  constructor(private http: HttpClient) {}

  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.apiUrl);
  }

  getCompra(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.apiUrl}/${id}`);
  }

  createCompra(compra: Compra): Observable<Compra> {
    return this.http.post<Compra>(this.apiUrl, compra);
  }

  updateCompra(id: number, compra: Compra): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, compra);
  }
}
