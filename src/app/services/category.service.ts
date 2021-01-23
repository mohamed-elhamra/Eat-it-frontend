import { CategoryResponse } from './../models/category.response';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
}
