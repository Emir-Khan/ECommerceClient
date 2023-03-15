import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService, private router: Router, private toastrService: CustomToastrService) { }

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
    this.identityCheck()
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
