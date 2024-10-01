import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MateriaPrima } from '../interfaces/materiaPrima';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {
  private apiUrl = 'http://localhost:7215/api/MateriaPrima';

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

  updateCantidad(id: number, cantidad: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/cantidad`, cantidad);
  }

  descontarMateriaPrima(idEnvio: number): Observable<any> {
    const url = `${this.apiUrl}/${idEnvio}/descontarMateriaPrima`;
  
    return this.http.post<any>(url, {}, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(
        map(response => {
          // Verificar si la respuesta tiene la estructura esperada
          if (response.text) {
            return response; // Consideramos una respuesta exitosa
          } else {
            throw new Error('Respuesta inesperada del servidor.');
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error desconocido.';
          if (error.error && error.error.text) {
            errorMessage = error.error.text;
          } else if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Código de error: ${error.status}\nMensaje: ${error.error?.text || error.message}`;
          }
          console.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  descontarProductos(idEnvio: number): Observable<any> {
    const url = `${this.apiUrl}/${idEnvio}/descontarProductos`;
  
    return this.http.post<any>(url, {}, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(
        map(response => {
          // Verificar si la respuesta tiene la estructura esperada
          if (response.text) {
            return response; // Consideramos una respuesta exitosa
          } else {
            throw new Error('Respuesta inesperada del servidor.');
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error desconocido.';
          if (error.error && error.error.text) {
            errorMessage = error.error.text;
          } else if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Código de error: ${error.status}\nMensaje: ${error.error?.text || error.message}`;
          }
          console.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }
  
  
}
