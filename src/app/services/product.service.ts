import { ProductResponse } from './../models/product.response';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  create(
    name: string,
    description: string,
    price: string,
    category: string,
    image: File
  ): Observable<ProductResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);

    return this.http.post<ProductResponse>(
      `${environment.apiURL}/products`,
      formData
    );
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiURL}/products/${id}`);
  }

  getById(publicId: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${environment.apiURL}/products/${publicId}`
    );
  }

  update(
    publicId: string,
    name: string,
    description: string,
    price: string,
    category: string,
    image: File
  ): Observable<ProductResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);

    return this.http.patch<ProductResponse>(
      `${environment.apiURL}/products/${publicId}`,
      formData
    );
  }
}
