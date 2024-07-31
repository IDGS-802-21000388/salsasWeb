import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medida } from '../interfaces/medida';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {
  private apiUrl = 'https://localhost:7215/api/medida';

  constructor(private http: HttpClient) {}

  getMedidas(): Observable<Medida[]> {
    return this.http.get<Medida[]>(this.apiUrl);
  }

  getMedida(id: number): Observable<Medida> {
    return this.http.get<Medida>(`${this.apiUrl}/${id}`);
  }

  createMedida(medida: Medida): Observable<Medida> {
    return this.http.post<Medida>(this.apiUrl, medida);
  }

  updateMedida(id: number, medida: Medida): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, medida);
  }
}
