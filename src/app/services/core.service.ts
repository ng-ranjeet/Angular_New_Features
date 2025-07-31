import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { FilterOptions, ProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getProducts(filterData: Record<string, string>): Observable<ProductResponse> {
    let params = new HttpParams();
   for (let key in filterData) {
    if (filterData[key] !== undefined && filterData[key] !== null) {
      params = params.append(key, filterData[key]);
    }
  }
  return this.http.get<ProductResponse>(`${this.apiUrl}/products/search`, { params });
  }
  getProductFilters(): Observable<FilterOptions> {
  return this.http.get<FilterOptions>(`${this.apiUrl}/products/filters`);
  }
}
