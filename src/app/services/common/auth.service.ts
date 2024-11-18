import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/user/app.state';
import { setUser } from 'src/app/states/user/app.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store<AppState>, private jwtHelperService: JwtHelperService, private router: Router, private toastrService: CustomToastrService) { }

  identityCheck() {
    const token: string = localStorage.getItem("accessToken");
    // const decodeToken = this.jwtHelperService.decodeToken(token)
    // const expirationDate = this.jwtHelperService.getTokenExpirationDate(token)
    let expired: boolean
    try {
      expired = this.jwtHelperService.isTokenExpired(token);
    } catch {
      expired = true
    }

    _isAuthenticated = token != null && !expired;
  }

  logOut() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    this.identityCheck()
    this.store.dispatch(setUser({ user: null }))
    this.router.navigate([""])
    this.toastrService.message("You Logged Out Successfully", "Info", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    })
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;
