import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private tokenService: TokenService) {}

  private isLogged = new BehaviorSubject<boolean>(this.tokenService.isLogged());
  authStatus = this.isLogged.asObservable();

  changeStatus(status: boolean) {
    this.isLogged.next(status);
  }
}
