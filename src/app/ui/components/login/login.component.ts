import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { LoginUser } from 'src/app/contracts/login-user';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/common/auth.service';
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
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userNameOrEmail: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  get component() {
    return this.form.controls
  }

  async onSubmit(user: LoginUser) {
    this.submitted = true

    if (this.form.invalid)
      return;
    this.spinner.show(SpinnerType.RunningDots)

    await this.userService.login(user, () => {
      this.authService.identityCheck()

      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"]
        if (returnUrl)
          this.router.navigate([returnUrl])
        else
          this.router.navigate([""])
      })

      this.spinner.hide(SpinnerType.RunningDots)
    })
  }
}
