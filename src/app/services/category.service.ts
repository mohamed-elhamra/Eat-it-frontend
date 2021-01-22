import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  create(name: string, image: File) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    return this.http.post(`${environment.apiURL}/categories`, formData);
  }
}
