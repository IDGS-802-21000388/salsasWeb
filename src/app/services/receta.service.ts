import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from '../interfaces/receta';
import { Medida } from '../interfaces/receta';
import { MateriaPrimaDetalle } from '../interfaces/receta';
import { DetalleReceta } from '../interfaces/receta';
import { Producto } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})

export class RecetaService {
  private apiUrl = 'https://localhost:7215/api/Receta';
  private apiUrlP = 'https://localhost:7215/api/Producto';

  constructor(private http: HttpClient) {}

  getDetalleReceta(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/getProducto`);
  }

  getMedida(): Observable<Medida[]> {
    return this.http.get<Medida[]>(`${this.apiUrl}/getMedida`);
  }

  getDetalleRecetaId(id: number): Observable<DetalleReceta> {
    return this.http.get<DetalleReceta>(`${this.apiUrl}/getDetalleReceta/${id}`);
  }

  getMaPrDetalle(): Observable<MateriaPrimaDetalle[]> {
    return this.http.get<MateriaPrimaDetalle[]>(`${this.apiUrl}/getMateriaPrimaDetalle`);
  }

  insertProductoConIngredientes(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insertProductoConIngredientes`, data);
  }
  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrlP}/${id}`);
  }

  updateProductoAndReceta(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/updateProductoAndReceta`, data);
  }

  updateProductoEstatus(idProducto: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateProductoEstatus/${idProducto}`, {});
}

  // Nuevo método para agregar stock
  agregarStock(idProducto: number, cantidadAgregar: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${idProducto}/agregarStock`, cantidadAgregar);
  }


  
}
