import { Router } from '@angular/router';
import { AccountService } from './../../services/account.service';
import { TokenService } from './../../services/token.service';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toaster: ToastrService,
    private tokenService: TokenService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  login() {
    this.userService.login(this.form.value).subscribe(
      (res) => {
        this.tokenService.handle(res);
        this.accountService.changeStatus(true);
        this.toaster.success('Login successfully', 'Eat it');
        this.router.navigateByUrl('/category');
      },
      (error) => {
        this.toaster.error('Bad credentials, try again', 'Eat it');
      }
    );
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
