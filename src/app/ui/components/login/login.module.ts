import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';



@NgModule({
  declarations: [
    LoginComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: LoginComponent }
    ]),
    SocialLoginModule,
    GoogleSigninButtonModule
  ]
})
export class LoginModule { }
