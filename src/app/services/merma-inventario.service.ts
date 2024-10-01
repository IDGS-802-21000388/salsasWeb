// src/app/services/merma-inventario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MermaInventario } from '../interfaces/mermaInventario';

@Injectable({
  providedIn: 'root'
})
export class MermaInventarioService {
  private apiUrl = 'http://localhost:7215/api/MermaInventario';

  constructor(private http: HttpClient) {}

  getMermas(): Observable<MermaInventario[]> {
    return this.http.get<MermaInventario[]>(this.apiUrl);
  }

  getMerma(id: number): Observable<MermaInventario> {
    return this.http.get<MermaInventario>(`${this.apiUrl}/${id}`);
  }

  createMerma(merma: MermaInventario): Observable<MermaInventario> {
    return this.http.post<MermaInventario>(this.apiUrl, merma);
  }

  updateMerma(id: number, merma: MermaInventario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, merma);
  }

  deleteMerma(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
