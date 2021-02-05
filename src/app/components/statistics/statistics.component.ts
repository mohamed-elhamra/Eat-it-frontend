import { CategoryService } from './../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../services/order.service';
import { OrdersNumberByUserResponse } from './../../models/ordersNumberByUser.response';
import { Component, OnInit } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { FormControl } from '@angular/forms';
import { CategoryResponse } from 'src/app/models/category.response';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  categories: CategoryResponse[];
  category = new FormControl('');
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
      name: 'Nbr of orders',
      prop: 'numberOfOrders',
      cellClass: 'text-center',
    },
  ];

  statistics = [];

  selected: any[] = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getOrdersNumberByUser();
    this.getCategories();
  }

  getOrdersNumberByUser() {
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

  getCategories() {
    this.categoryService.getAll().subscribe(
      (res) => {
        this.categories = res;
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
