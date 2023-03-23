import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { LoginUser } from 'src/app/contracts/login-user';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  submitted: boolean
  constructor(private formBuilder: FormBuilder,
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      spinner.show(SpinnerType.RunningDots)
      switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user, () => { authService.identityCheck(); this.navigateToReturnUrlOrMain(); spinner.hide(SpinnerType.RunningDots) })
          break;
        case "FACEBOOK":
          await userAuthService.facebookLogin(user, () => { authService.identityCheck(); this.navigateToReturnUrlOrMain(); spinner.hide(SpinnerType.RunningDots) })
          break;
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userNameOrEmail: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  get component() {
    return this.form.controls
  }

  navigateToReturnUrlOrMain() {
    this.activatedRoute.queryParams.subscribe(params => {
      const returnUrl: string = params["returnUrl"]
      if (returnUrl)
        this.router.navigate([returnUrl])
      else
        this.router.navigate([""])
    })
  }

  async onSubmit(user: LoginUser) {
    this.submitted = true

    if (this.form.invalid)
      return;
    this.spinner.show(SpinnerType.RunningDots)

    await this.userAuthService.login(user, () => {
      this.authService.identityCheck()

      this.navigateToReturnUrlOrMain()

      this.spinner.hide(SpinnerType.RunningDots)
    })
  }

  async facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
