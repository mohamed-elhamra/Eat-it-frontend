import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
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
  image: File;
  invalidInputFile: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
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
      description: ['', [Validators.required, Validators.minLength(15)]],
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

  onFileChange(event, fileInput) {
    const extions: string[] = ['JPEG', 'PNG', 'JPG', 'jpeg', 'png', 'jpg'];
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      if (extions.includes(image.name.split('.')[1])) {
        this.invalidInputFile = false;
        this.image = image;
      } else {
        this.invalidInputFile = true;
        this.toastr.warning(
          'File extension allowed (png, jpeg, jpg)',
          'Eat it'
        );
        fileInput.value = '';
      }
    }
  }

  create() {
    this.productService
      .create(
        this.name.value,
        this.description.value,
        this.price.value,
        this.category.value,
        this.image
      )
      .subscribe(
        (res) => {
          this.toastr.success(
            `${res.name} product was created successfully`,
            'Eat it'
          );
          this.router.navigateByUrl(`/category`);
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
