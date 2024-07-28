import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComparacionService {
  private apiUrl = 'https://localhost:7215/api/reports';

  constructor(private http: HttpClient) {}

  getTotalSales(startDate?: string, endDate?: string): Observable<number> {
    let params = new HttpParams();
    if (startDate) params = params.append('startDate', startDate);
    if (endDate) params = params.append('endDate', endDate);
    return this.http.get<number>(`${this.apiUrl}/total-sales`, { params });
  }

  getTotalPurchases(startDate?: string, endDate?: string): Observable<number> {
    let params = new HttpParams();
    if (startDate) params = params.append('startDate', startDate);
    if (endDate) params = params.append('endDate', endDate);
    return this.http.get<number>(`${this.apiUrl}/total-purchases`, { params });
  }

  getMonthlySales(year: number): Observable<any> {
    let params = new HttpParams().append('year', year.toString());
    return this.http.get<any>(`${this.apiUrl}/monthly-sales`, { params });
  }

  getMonthlyPurchases(year: number): Observable<any> {
    let params = new HttpParams().append('year', year.toString());
    return this.http.get<any>(`${this.apiUrl}/monthly-purchases`, { params });
  }

  getTopSellingProductsByYear(year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-selling-products-year`, { params: { year: year.toString() } });
  }

  getTopSellingProductsByMonth(year: number, month: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-selling-products-month`, { params: { year: year.toString(), month: month.toString() } });
  }

  getSalesDistributionByYear(year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sales-distribution`, { params: { year } });
  }
}