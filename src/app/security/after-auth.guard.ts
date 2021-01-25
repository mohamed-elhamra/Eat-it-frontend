import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AfterAuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private accountService: AccountService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.tokenService.isLogged()) {
      this.accountService.changeStatus(true);
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
