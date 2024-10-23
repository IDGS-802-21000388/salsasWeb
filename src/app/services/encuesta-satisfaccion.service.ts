import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncuestaSatisfaccion } from '../interfaces/encuesta-satisfaccion';

@Injectable({
  providedIn: 'root'
})
export class EncuestaSatisfaccionService {

  private apiUrl = 'http://localhost:7215/api/EncuestaSatisfaccion';

  constructor(private http: HttpClient) { }

  getEncuestas(): Observable<EncuestaSatisfaccion[]> {
    return this.http.get<EncuestaSatisfaccion[]>(this.apiUrl);
  }

  getEncuesta(id: number): Observable<EncuestaSatisfaccion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EncuestaSatisfaccion>(url);
  }

  createEncuesta(encuesta: EncuestaSatisfaccion): Observable<EncuestaSatisfaccion> {
    return this.http.post<EncuestaSatisfaccion>(this.apiUrl, encuesta);
  }

  updateEncuesta(id: number, encuesta: EncuestaSatisfaccion): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, encuesta);
  }

  deleteEncuesta(id: number): Observable<EncuestaSatisfaccion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<EncuestaSatisfaccion>(url);
  }
}
