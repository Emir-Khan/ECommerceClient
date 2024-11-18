import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUser } from 'src/app/contracts/users/create-user';
import { User } from 'src/app/models/user';
import { HttpClientService } from '../http-client.service';
import { ListUser } from 'src/app/contracts/users/list-users';
import { UserDetail } from 'src/app/models/user-detail';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/user/app.state';
import { setUser } from 'src/app/states/user/app.action';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: UserDetail;
  constructor(private store: Store<AppState>, private httpClientService: HttpClientService) { }

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

  async getMe(successCallback?: () => void, errorCallback?: (error: any) => void): Promise<UserDetail> {
    const observable: Observable<UserDetail> = this.httpClientService.get({
      controller: "users",
      action: "me"
    });

    const promise = firstValueFrom(observable);
    promise.then((data) => {
      this.store.dispatch(setUser({ user: data }));
      successCallback?.()
    }).catch(error => errorCallback?.(error.message));

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

  get isAdmin(): boolean {
    return this.user?.roles.includes("Admin Dashboard");
  }

  get currentUser(): UserDetail {
    return this.user;
  }
}
