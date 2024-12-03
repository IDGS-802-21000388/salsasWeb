import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuejasService {
    private apiUrl = 'http://localhost:7215/api/SeguimientoQuejas'; // Cambia la URL al endpoint correcto

  constructor(private http: HttpClient) {}

  crearQueja(queja: { contenido: string; idUsuario: number; fechaCreacion: string; estado: string }): Observable<any> {
    return this.http.post(this.apiUrl, queja);
  }
}
