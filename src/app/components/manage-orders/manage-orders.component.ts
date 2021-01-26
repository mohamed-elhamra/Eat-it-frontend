import { OrderStatus } from './../../models/order-status.enum';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/models/order.response';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ChangeStatusComponent } from '../change-status/change-status.component';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css'],
})
export class ManageOrdersComponent implements OnInit {
  form: FormGroup;
  order: OrderResponse = new OrderResponse();
  orderStatus: OrderStatus;

  constructor(
    private dialog: MatDialog,
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

  onClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '40%';

    let status = [
      OrderStatus.DELIVERED,
      OrderStatus.ON_THE_WAY,
      OrderStatus.PROCESSING,
    ];
    const data = {
      orderId: this.id.value,
      status: status,
    };

    dialogConfig.data = data;

    this.dialog
      .open(ChangeStatusComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        if (res) this.order.status = res;
      });
  }

  get id() {
    return this.form.get('id');
  }
}
