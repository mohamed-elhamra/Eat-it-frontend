import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { CategoryResponse } from 'src/app/models/category.response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css'],
})
export class AllProductComponent implements OnInit {
  categories: CategoryResponse[];
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.form = this.fb.group({
      category: ['', Validators.required],
    });
  }

  getCategories() {
    this.categoryService.getAll().subscribe(
      (res) => {
        if (res.length == 0)
          this.toastr.warning(
            'There is no category, try to create one',
            'Eat it'
          );
        this.categories = res;
      },
      (err) => {
        this.toastr.error('Something went wrong, try later', 'Eat it');
      }
    );
  }

  create() {
    this.router.navigateByUrl(`/category/${this.category.value}`);
  }

  get category() {
    return this.form.get('category');
  }
}
