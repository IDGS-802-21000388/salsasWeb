import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paqueterium } from '../interfaces/paqueterium';

@Injectable({
  providedIn: 'root'
})
export class PaqueteriaService {
  private apiUrl = 'https://localhost:7215/api/Paqueteria';

  constructor(private http: HttpClient) {}

  getPaqueterias(): Observable<Paqueterium[]> {
    return this.http.get<Paqueterium[]>(this.apiUrl);
  }

  getPaqueterium(id: number): Observable<Paqueterium> {
    return this.http.get<Paqueterium>(`${this.apiUrl}/${id}`);
  }

  createPaqueterium(paqueterium: Paqueterium): Observable<Paqueterium> {
    return this.http.post<Paqueterium>(this.apiUrl, paqueterium);
  }

  updatePaqueterium(id: number, paqueterium: Paqueterium): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, paqueterium);
  }

  deletePaqueterium(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
