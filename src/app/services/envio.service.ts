import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Envio } from '../interfaces/envio';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {
  private apiUrl = 'https://localhost:7215/api/Envio';

  constructor(private http: HttpClient) {}

  getEnvios(): Observable<Envio[]> {
    return this.http.get<Envio[]>(this.apiUrl);
  }

  getEnvio(id: number): Observable<Envio> {
    return this.http.get<Envio>(`${this.apiUrl}/${id}`);
  }

  createEnvio(envio: Envio): Observable<Envio> {
    return this.http.post<Envio>(this.apiUrl, envio);
  }

  updateEnvio(id: number, envio: Envio): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, envio);
  }

  deleteEnvio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
