import { async } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../services/order.service';
import { OrdersNumberByUserResponse } from './../../models/ordersNumberByUser.response';
import { Component, OnInit } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';

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

  selected: any[] = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(
    private dialog: MatDialog,
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

  onSelect(event) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '40%';
    dialogConfig.data = this.selected[0].clientPublicId;

    this.dialog.open(UserDetailsComponent, dialogConfig);
  }
}
