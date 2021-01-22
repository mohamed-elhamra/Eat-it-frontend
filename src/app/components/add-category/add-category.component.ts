import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ChangeData } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  form: FormGroup;
  image: File;
  invalidInputFile: boolean = true;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
    });
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
    this.categoryService.create(this.name.value, this.image).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get name() {
    return this.form.get('name');
  }
}
