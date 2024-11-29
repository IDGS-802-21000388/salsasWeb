import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { CodigoDescuento, UsuarioCodigoDescuento } from '../interfaces/codigoDescuento';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {
  private apiUrl = 'http://localhost:7215/api/CodigosDescuento';

  constructor(private http: HttpClient) {}

  // Obtener todos los códigos de descuento
  getAllCodigos(): Observable<CodigoDescuento[]> {
    return this.http.get<CodigoDescuento[]>(this.apiUrl);
  }

  // Actualizar un código de descuento
  getCodigo(id: number): Observable<CodigoDescuento[]> {
    return this.http.get<CodigoDescuento[]>(`${this.apiUrl}/${id}`);
  }


  // Crear un nuevo código de descuento
  createPromocion(promocion: CodigoDescuento): Observable<CodigoDescuento> {
    return this.http.post<CodigoDescuento>(this.apiUrl, promocion);
  }

  // Actualizar un código de descuento
  updatePromocion(id: number, promocion: CodigoDescuento): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, promocion);
  }

  // Cambiar estatus de un código de descuento (activar/desactivar)
  cambiarEstatusCodigo(id: number, estatus: boolean): Observable<UsuarioCodigoDescuento> {
    return this.http.patch<UsuarioCodigoDescuento>(
      `${this.apiUrl}/${id}/estatus?estatus=${estatus}`,
      {}
    );
  }

  // Asignar un código a usuarios específicos
  asignarCodigoAUsuarios(idCodigo: number, usuariosIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/AsignarCodigo?idCodigo=${idCodigo}`, usuariosIds);
  }

  // Obtener los códigos asignados a un usuario
  getCodigosPorUsuario(idUsuario: number): Observable<CodigoDescuento[]> {
    return this.http.get<CodigoDescuento[]>(`${this.apiUrl}/PorUsuario/${idUsuario}`);
  }

  // Validar un código de descuento para un usuario
  validarCodigo(idUsuario: number, codigo: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/ValidarCodigo?idUsuario=${idUsuario}&codigo=${codigo}`
    );
  }

  // Marcar un código como usado
  marcarCodigoUsado(idUsuario: number, idCodigo: number): Observable<CodigoDescuento> {
    return this.http.post<CodigoDescuento>(
      `${this.apiUrl}/MarcarUsado?idUsuario=${idUsuario}&idCodigo=${idCodigo}`,
      {}
    );
  }

  // Obtener los usuarios con un código asignado
  fetchUsuariosConCodigo(idCodigo: number): Observable<UsuarioCodigoDescuento[]> {
    return this.http.get<UsuarioCodigoDescuento[]>(`${this.apiUrl}/${idCodigo}/usuarios`);
  }

  // Obtener todos los datos de las tablas CodigosDescuento y UsuarioCodigoDescuento
  obtenerDatosTablas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ObtenerDatosTablas`);
  }

  modificarEstatus(
    idCodigo: number,
    nuevoEstatusCodigo: boolean | null,
    idUsuarioCodigo: number | null,
    nuevoEstatusUsuarioCodigo: boolean | null
  ): Observable<any> {
    let params = new HttpParams();

    if (idCodigo > 0) params = params.set('idCodigo', idCodigo.toString());
    if (nuevoEstatusCodigo !== null) params = params.set('nuevoEstatusCodigo', nuevoEstatusCodigo.toString());
    if (idUsuarioCodigo !== null) params = params.set('idUsuarioCodigo', idUsuarioCodigo.toString());
    if (nuevoEstatusUsuarioCodigo !== null) params = params.set('nuevoEstatusUsuarioCodigo', nuevoEstatusUsuarioCodigo.toString());
  
    return this.http.put<any>(`${this.apiUrl}/ModificarEstatus`, null, { params });
  }

}
