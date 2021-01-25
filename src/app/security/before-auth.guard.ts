import { Injectable } from '@angular/core';
import { AccountService } from './../services/account.service';
import { TokenService } from './../services/token.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BeforeAuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private accountService: AccountService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.tokenService.isLogged()) {
      this.tokenService.remove();
      this.accountService.changeStatus(false);
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
}
