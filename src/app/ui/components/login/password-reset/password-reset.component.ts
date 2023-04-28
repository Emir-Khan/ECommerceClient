import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private userAuthService: UserAuthService,
    private toastrService: CustomToastrService) { }

  ngOnInit() {
  }

  passwordReset(email: string) {
    this.spinner.show(SpinnerType.RunningDots)
    this.userAuthService.passwordReset(email, () => this.spinner.hide(SpinnerType.RunningDots));
    this.toastrService.message("Email Sent Successfully", "Success", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    })
  }

  async verifyResetToken(resetToken: string, userId: string) {
    this.spinner.show(SpinnerType.RunningDots)
    await this.userAuthService.verifyResetToken(resetToken, userId, () => this.spinner.hide(SpinnerType.RunningDots));
    this.toastrService.message("Token Verified Successfully", "Success", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    })
  }
}
