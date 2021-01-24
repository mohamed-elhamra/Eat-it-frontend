import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../services/category.service';
import { CategoryResponse } from './../../models/category.response';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  categories: CategoryResponse[];
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
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

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get price() {
    return this.form.get('price');
  }

  get category() {
    return this.form.get('category');
  }
}
