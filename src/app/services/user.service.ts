import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:7215/api/usuarios'; // Reemplaza con la URL correcta de tu API

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUser(id: number): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Usuario>(url);
  }

  createUser(usuario: Usuario): Observable<Usuario> {
    console.log(usuario);
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  updateUser(id: number, usuario: Usuario): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, usuario);
  }

  deleteUser(id: number): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Usuario>(url);
  }

  activateUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/activate/${id}`;
    return this.http.put(url, {});
  }
}
