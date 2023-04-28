import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  form: FormGroup
  submitted: boolean
  state: boolean = false;
  email?: string
  constructor(private formBuilder: FormBuilder,
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.spinner.show(SpinnerType.RunningDots)
    this.activatedRoute.params.subscribe({
      next: async (params) => {
        const userId = params["userId"];
        const resetToken = params["resetToken"];

        await this.userAuthService.verifyResetToken(resetToken, userId, (data) => {
          this.spinner.hide(SpinnerType.RunningDots)
          this.state = data.state;
          this.email = data.email;

          if (this.state)
            this.toastrService.message("Token Verified Successfully", "Success", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            })
          else
            this.toastrService.message("Token Verification Failed", "Error", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
        });
      }
    })

    this.form = this.formBuilder.group({
      password: ["", [Validators.required]],
      passwordConfirm: ["", [Validators.required]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let passwordConfirm = group.get("passwordConfirm").value;
        return password === passwordConfirm ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.form.controls
  }

  async onSubmit(passwords: { password: string, passwordConfirm: string }) {
    this.submitted = true

    if (this.form.invalid)
      return;
    this.spinner.show(SpinnerType.RunningDots)
    this.activatedRoute.params.subscribe({
      next: async (params) => {
        const userId = params["userId"];
        const resetToken = params["resetToken"];
        await this.userService.updatePassword(userId, resetToken, passwords.password, passwords.passwordConfirm,
          () => {
            this.toastrService.message("Password Updated Successfully", "Success", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            })
            this.router.navigate(["/login"]);
          }, () => {
            this.toastrService.message("Password Update Failed", "Error", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
          });
        this.spinner.hide(SpinnerType.RunningDots)
      }
    })
  }
}
