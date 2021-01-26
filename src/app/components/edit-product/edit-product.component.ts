import { ProductService } from './../../services/product.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryResponse } from 'src/app/models/category.response';
import { ChangeStatusComponent } from '../change-status/change-status.component';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  categories: CategoryResponse[];
  form: FormGroup;
  image: File;
  invalidInputFile: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditProductComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService
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
    this.createForm();
  }

  createForm() {
    this.productService.getById(this.data).subscribe(
      (res) => {
        this.category.setValue(res.categoryPublicId);
        this.name.setValue(res.name);
        this.description.setValue(res.description);
        this.price.setValue(res.price);
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

  update() {
    this.productService
      .update(
        this.data,
        this.name.value,
        this.description.value,
        this.price.value,
        this.category.value,
        this.image
      )
      .subscribe(
        (res) => {
          this.dialogRef.close(res);
        },
        (err) => {
          this.toastr.error('Something went wrong, try later', 'Eat it');
        }
      );
  }

  close() {
    this.dialogRef.close();
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
