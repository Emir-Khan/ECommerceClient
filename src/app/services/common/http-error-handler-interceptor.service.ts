import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, of } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService,
    private spinner: NgxSpinnerService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          try {
            this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), () => this.spinner.hide(SpinnerType.RunningDots)).then(({ token }) => {
              if (!token.refreshToken) {
                this.toastrService.message("You are not authorized to do this operation", "Unauthorized Operation", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopRight
                });
              }
            }).catch(() => {
              const url = this.router.url;
              if (url == "/products")
                this.toastrService.message("You need to be logged in to add products to the cart.", "Please Login", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopRight
                });
              this.spinner.hide(SpinnerType.RunningDots)
            })
            // need update
          } catch (error) {
            console.log(error);
          }
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Unable to Access Server", "Warning", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Invalid Request", "Warning", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight
          });
          break
        case HttpStatusCode.NotFound:
          this.toastrService.message("Page Not Found", "Warning", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight
          });
          break;
        default:
          this.toastrService.message("Unknown Error", "Warning", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight
          });
          break;
      }

      return of(error)
    }))
  }
}
