import { ProductService } from './../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProductResponse } from './../../models/product.response';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

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
    private toastr: ToastrService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const categoryId = params.get('categoryId');
      this.categoryService.getProducts(categoryId).subscribe(
        (res) => {
          if (res.length == 0)
            this.toastr.warning(
              'There is no product in this category',
              'Eat it'
            );
          this.products = res;
        },
        (err) => {
          this.toastr.error('Something went wrong, try later', 'Eat it');
        }
      );
    });
  }

  delete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((res) => {
      if (res.value) {
        this.productService.delete(id).subscribe(
          (res) => {
            this.products = this.products.filter(
              (product) => product.publicId !== id
            );
            this.toastr.success(
              'The products was deleted successfully',
              'Eat it'
            );
          },
          (err) => {
            console.log(err);
            this.toastr.error('Something went wrong, try later', 'Eat it');
          }
        );
      }
    });
  }
}
