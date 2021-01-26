import { EditProductComponent } from './../edit-product/edit-product.component';
import { ProductService } from './../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProductResponse } from './../../models/product.response';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit {
  products: ProductResponse[];

  constructor(
    private dialog: MatDialog,
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

  edit(publicId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.data = publicId;

    this.dialog
      .open(EditProductComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          console.log(res);
          this.products.forEach((product) => {
            if (product.publicId == res.publicId) {
              product.name = res.name;
              product.price = res.price;
              product.publicId = res.publicId;
              product.imageUrl = res.imageUrl;
              product.description = res.description;
              product.categoryPublicId = res.categoryPublicId;
            }
          });
          const myPorducts: ProductResponse[] = this.products.filter(
            (product) => product.categoryPublicId != res.categoryPublicId
          );
          if (myPorducts.length > 0) this.products = myPorducts;
          this.toastr.success('Product was updated successfully', 'Eat it');
        }
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
