import { async } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../services/order.service';
import { OrdersNumberByUserResponse } from './../../models/ordersNumberByUser.response';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  rows: OrdersNumberByUserResponse[];
  columns = [
    {
      name: 'Client ID',
      prop: 'clientPublicId',
    },
    {
      name: 'Full name',
      prop: 'clientFullName',
    },
    {
      name: 'Nb of orders',
      prop: 'numberOfOrders',
      cellClass: 'text-center',
    },
  ];

  statistics = [];

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.orderService.ordersNumberByUser().subscribe(
      (res) => {
        let data = [];
        res.forEach((elmt) => {
          data.push({
            name: elmt.clientFullName,
            value: elmt.numberOfOrders,
          });
        });
        this.statistics = data;
        this.rows = res;
      },
      (err) => {
        this.toastr.error('Something went wrong, try later', 'Eat it');
      }
    );
  }
}
