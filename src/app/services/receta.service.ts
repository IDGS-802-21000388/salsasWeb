import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from '../interfaces/receta';
import { Medida } from '../interfaces/receta';
import { MateriaPrimaDetalle } from '../interfaces/receta';

@Injectable({
  providedIn: 'root'
})

export class RecetaService {
  private apiUrl = 'https://localhost:7215/api/Receta';

  constructor(private http: HttpClient) {}

  getDetalleReceta(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/getProducto`);
  }

  getMedida(): Observable<Medida[]> {
    return this.http.get<Medida[]>(`${this.apiUrl}/getMedida`);
  }

  getMaPrDetalle(): Observable<MateriaPrimaDetalle[]> {
    return this.http.get<MateriaPrimaDetalle[]>(`${this.apiUrl}/getMateriaPrimaDetalle`);
  }

  insertProductoConIngredientes(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insertProductoConIngredientes`, data);
  }
  
}
