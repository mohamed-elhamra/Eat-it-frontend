import { OrdersNumberByUserResponse } from './../models/ordersNumberByUser.response';
import { environment } from './../../environments/environment';
import { OrderResponse } from './../models/order.response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getById(publicId: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(
      `${environment.apiURL}/orders/${publicId}`
    );
  }

  updateStatus(publicId: string, status: string) {
    const formData = new FormData();
    formData.append('status', status);
    return this.http.patch<OrderResponse>(
      `${environment.apiURL}/orders/${publicId}`,
      formData
    );
  }

  ordersNumberByUser(): Observable<OrdersNumberByUserResponse[]> {
    return this.http.get<OrdersNumberByUserResponse[]>(
      `${environment.apiURL}/orders/ordersNumberByUser`
    );
  }
}
