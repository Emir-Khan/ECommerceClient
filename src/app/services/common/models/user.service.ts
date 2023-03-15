import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginUser } from 'src/app/contracts/login-user';
import { TokenResponse } from 'src/app/contracts/token/token-response';
import { CreateUser } from 'src/app/contracts/users/create-user';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user: User): Promise<CreateUser> {
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as CreateUser;
  }

  async login(user: LoginUser, callBackFunction?: () => void) {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "users",
      action: "login"
    }, user)

    const token: TokenResponse = await firstValueFrom(observable);
    if (token) {
      localStorage.setItem("accessToken", token.token.accessToken)
      // localStorage.setItem("expiration",token.token.expiration.toString())
      this.toastrService.message("Login successful", "Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callBackFunction()
  }
}
