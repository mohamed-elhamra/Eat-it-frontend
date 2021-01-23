import { ToastrService } from 'ngx-toastr';
import { ProductResponse } from './../../models/product.response';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit {
  products: ProductResponse[];

  constructor(
    private categoryService: CategoryService,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const categoryId = params.get('categoryId');
      this.categoryService.getProducts(categoryId).subscribe(
        (res) => {
          this.products = res;
        },
        (err) => {
          this.toastr.error('Something went wrong, try later', 'Eat it');
        }
      );
    });
  }
}
