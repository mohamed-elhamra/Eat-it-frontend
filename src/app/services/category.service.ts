import { ProductStatistics } from './../models/productStatistics.response';
import { ProductResponse } from './../models/product.response';
import { CategoryResponse } from './../models/category.response';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  create(name: string, image: File): Observable<CategoryResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    return this.http.post<CategoryResponse>(
      `${environment.apiURL}/categories`,
      formData
    );
  }

  getAll() {
    return this.http.get<CategoryResponse[]>(
      `${environment.apiURL}/categories`
    );
  }

  delete(categoryPublicId: string) {
    return this.http.delete(
      `${environment.apiURL}/categories/${categoryPublicId}`
    );
  }

  getProducts(categoryPublicId: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${environment.apiURL}/categories/${categoryPublicId}/products`
    );
  }

  getProductsStatistics(
    categoryPublicId: string,
    duration: string
  ): Observable<ProductStatistics[]> {
    const params = new HttpParams().append('duration', duration);
    return this.http.get<ProductStatistics[]>(
      `${environment.apiURL}/categories/${categoryPublicId}/products/statistics`,
      { params }
    );
  }
}
