import { OrderProductResponse } from './orderProduct.response';
export class OrderResponse {
  publicId: string = '';
  address: string;
  status: string;
  date: string;
  userPublicId: string;
  orderProducts: OrderProductResponse[];
}
