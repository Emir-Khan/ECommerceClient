import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUser } from 'src/app/contracts/users/create-user';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';
import { ListUser } from 'src/app/contracts/users/list-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClientService: HttpClientService) { }

  async create(user: User): Promise<CreateUser> {
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as CreateUser;
  }

  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallback?: () => void, errorCallback?: () => void) {
    const observable = this.httpClientService.post({
      controller: "users",
      action: "update-password"
    }, { userId, resetToken, password, passwordConfirm });

    const promise = firstValueFrom(observable);
    promise.then(() => {
      successCallback()
    }).catch(() => {
      errorCallback()
    })
  }

  async getAll(page: number, size: number, successCallback?: () => void, errorCallback?: (errorMessage: string) => void): Promise<{ totalUsersCount: number, users: ListUser[] }> {
    const observable: Observable<{ totalUsersCount: number, users: ListUser[] }> = this.httpClientService.get({
      controller: "users",
      queryString: `page=${page}&size=${size}`
    });

    const promise = firstValueFrom(observable)
    promise.then(() => successCallback?.())
      .catch((error) => errorCallback?.(error));

    return await promise;
  }

  async assignRoleToUser(userId: string, roles: string[], successCallback?: () => void, errorCallback?: (error: any) => void) {
    const observable = this.httpClientService.post({
      controller: "users",
      action: "assign-role-to-user"
    }, { userId, roles })

    const promise = firstValueFrom(observable);
    promise.then(response => successCallback?.()).catch(error => errorCallback?.(error.message));

    return await promise;

  }

  async getUserRoles(userId: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<string[]> {
    const observable: Observable<any> = this.httpClientService.get({
      controller: "users",
      action: "get-user-roles",
    }, userId)

    const promise = firstValueFrom(observable);
    promise.then(response => successCallback?.()).catch(error => errorCallback?.(error.message));

    return (await promise).roles;
  }
}
