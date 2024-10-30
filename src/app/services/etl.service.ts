import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VentasPorProductoPeriodo } from '../interfaces/VentasPorProductoPeriodo'; 
import { RankingClientes } from '../interfaces/RankingClientes'; 

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiUrl = 'http://localhost:7215/api/ETL'; // Reemplaza con tu URL real

  constructor(private http: HttpClient) { }

  getVentasPorProductoPeriodos(): Observable<VentasPorProductoPeriodo[]> {
    return this.http.get<VentasPorProductoPeriodo[]>(`${this.apiUrl}/getVentasPorProductoPeriodos`);
  }

  getRankingClientes(): Observable<RankingClientes[]> {
    return this.http.get<RankingClientes[]>(`${this.apiUrl}/getRankingClientes`);
  }
}