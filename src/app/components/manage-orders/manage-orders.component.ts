import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/models/order.response';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css'],
})
export class ManageOrdersComponent implements OnInit {
  form: FormGroup;
  order: OrderResponse = new OrderResponse();

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
    });
  }

  search() {
    this.orderService.getById(this.id.value).subscribe(
      (res) => {
        this.order = res;
        console.log(this.order);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  getTotal() {
    let total = 0;
    this.order.orderProducts.forEach(
      (orderProduct) =>
        (total = total + orderProduct.price * orderProduct.quantity)
    );
    return total;
  }

  get id() {
    return this.form.get('id');
  }
}
