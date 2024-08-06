import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VentasPorProductoPeriodo } from '../interfaces/VentasPorProductoPeriodo'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiUrl = 'https://localhost:7215/api/ETL/getVentasPorProductoPeriodos'; // Reemplaza con tu URL real

  constructor(private http: HttpClient) { }

  getVentasPorProductoPeriodos(): Observable<VentasPorProductoPeriodo[]> {
    return this.http.get<VentasPorProductoPeriodo[]>(this.apiUrl);
  }
}
