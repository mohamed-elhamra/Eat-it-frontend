import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  rows = [
    {
      clientPublicId: 's15siHl4M6J5uk9',
      clientFullName: 'Said Elhamra',
      numberOfOrders: 7,
    },
    {
      clientPublicId: 'PQaQ9qiQw2BbAgr',
      clientFullName: 'Mohamed ELHAMRA',
      numberOfOrders: 2,
    },
  ];
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

  constructor() {}

  ngOnInit(): void {}
}
