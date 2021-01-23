import { Router } from '@angular/router';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { PasswordValidator } from './../../validators/password.validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryISO } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  preferedCountries = [CountryISO.Morocco];
  form: FormGroup;
  user: User = new User();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ],
        ],
        phone: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: PasswordValidator }
    );
  }

  onSubmit() {
    this.user.fullName = this.fullName.value;
    let phoneLength = this.phone.value.number.length;
    this.user.phone = '0' + this.phone.value.number.substring(phoneLength - 9);
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    this.user.roles = 'admin';

    this.userService.create(this.user).subscribe(
      (res) => {
        this.toastr.success('User created successfully', 'Eat it');
        this.router.navigateByUrl('/login');
      },
      (error) => {
        this.toastr.error(error.error.message, 'Eat it');
      }
    );
  }

  get fullName() {
    return this.form.get('fullName');
  }

  get phone() {
    return this.form.get('phone');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
