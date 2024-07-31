import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MateriaPrima } from '../interfaces/materiaPrima';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {
  private apiUrl = 'https://localhost:7215/api/MateriaPrima';

  constructor(private http: HttpClient) {}

  getMateriasPrimas(): Observable<MateriaPrima[]> {
    return this.http.get<MateriaPrima[]>(this.apiUrl);
  }

  getMateriaPrima(id: number): Observable<MateriaPrima> {
    return this.http.get<MateriaPrima>(`${this.apiUrl}/${id}`);
  }

  createMateriaPrima(materiaPrima: MateriaPrima): Observable<MateriaPrima> {
    return this.http.post<MateriaPrima>(this.apiUrl, materiaPrima);
  }

  updateMateriaPrima(id: number, materiaPrima: MateriaPrima): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, materiaPrima);
  }
}
