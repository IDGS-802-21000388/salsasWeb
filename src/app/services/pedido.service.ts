import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvioDetalleWeb } from '../interfaces/envioDetalle';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'https://localhost:7215/api/shipping'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  GetPedidos(): Observable<EnvioDetalleWeb[]> {
    return this.http.get<EnvioDetalleWeb[]>(this.apiUrl);
  } 
}
