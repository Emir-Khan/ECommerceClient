import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginUser } from 'src/app/contracts/login-user';
import { TokenResponse } from 'src/app/contracts/token/token-response';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }
  async login(user: LoginUser, callBackFunction?: () => void) {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, user)

    const token: TokenResponse = await firstValueFrom(observable);
    if (token) {
      localStorage.setItem("accessToken", token.token.accessToken)
      localStorage.setItem("refreshToken", token.token.refreshToken)
      // localStorage.setItem("expiration",token.token.expiration.toString())
      this.toastrService.message("Login successful", "Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callBackFunction()
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void) {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "auth"
    }, user)

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)
      this.toastrService.message("Login Success", "Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }

    callBackFunction()
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void) {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "facebook-login",
      controller: "auth"
    }, user)

    const tokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)
      this.toastrService.message("Login Successful", "Success", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
    }

    callBackFunction()
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void):Promise<TokenResponse> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      controller: "auth",
      action: "refreshtokenlogin"
    }, { refreshToken })

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)
    }
    callBackFunction();
    return tokenResponse
  }
}
