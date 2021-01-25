import { AccountService } from './../../services/account.service';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  currentUser: any;

  constructor(
    private tokenService: TokenService,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.accountService.authStatus.subscribe((res) => {
      this.currentUser = this.tokenService.getInfos();
    });
  }

  logout() {
    this.tokenService.remove();
    this.accountService.changeStatus(false);
    this.toastr.error('See you soon', 'Eat it');
    this.router.navigateByUrl('/login');
  }
}
