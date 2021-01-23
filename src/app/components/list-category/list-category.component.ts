import { ToastrService } from 'ngx-toastr';
import { CategoryResponse } from './../../models/category.response';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent implements OnInit {
  categories: CategoryResponse[];

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      (res) => {
        this.categories = res;
      },
      (err) => {
        this.toastr.error('Something went wrong, try later', 'Eat it');
      }
    );
  }

  delete(publicId: string) {
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
        this.categoryService.delete(publicId).subscribe(
          (res) => {
            this.categories = this.categories.filter(
              (category) => category.publicId !== publicId
            );
            this.toastr.success(
              'The category was deleted successfully',
              'Eat it'
            );
          },
          (err) => {
            this.toastr.error('Something went wrong, try later', 'Eat it');
          }
        );
      }
    });
  }
}
