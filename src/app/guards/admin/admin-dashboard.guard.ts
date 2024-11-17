import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardGuard implements CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router, private toastrService: CustomToastrService) { }

  check = async (): Promise<boolean> => {
    await this.userService.getMe();
    const isAdmin = this.userService.isAdmin;
    if (!isAdmin) {
      this.toastrService.message("You are not authorized to do this operation", "Unauthorized Operation", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      });
      this.router.navigate(["/"]);
    }
    return isAdmin;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }
}
