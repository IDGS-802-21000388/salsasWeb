import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario'; // Importa la interfaz

interface LoginRequest {
  correo: string;
  contrasenia: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7215/api/login'; // Ajusta esto a tu URL de API

  constructor(private http: HttpClient) { }

  login(correo: string, contrasenia: string): Observable<Usuario> { // Ajusta el tipo de retorno a Usuario
    const loginRequest: LoginRequest = { correo, contrasenia };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Usuario>(`${this.apiUrl}/login`, loginRequest, { headers })
      .pipe(
        map(response => {
          // Procesar la respuesta aquí si es necesario
          return response;
        })
      );
  }
}
