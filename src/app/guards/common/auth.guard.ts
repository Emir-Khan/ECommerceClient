import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthService, _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private jwtHelperService: JwtHelperService,
    private router: Router,
    private toastrService: CustomToastrService,
    private spinner: NgxSpinnerService,
    private authService:AuthService
  ) { }
  check(state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.RunningDots)
    this.authService.identityCheck()
    if (!_isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } })
      this.toastrService.message("Please login", "Info", {
        messageType: ToastrMessageType.Info,
        position: ToastrPosition.TopRight
      })
    }

    this.spinner.hide(SpinnerType.RunningDots)
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.check(state)
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.check(state);
    return true;
  }

}
