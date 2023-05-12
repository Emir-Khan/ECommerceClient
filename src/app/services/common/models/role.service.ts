import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ListRole } from 'src/app/contracts/role/ListRole';
import { GetRolesResponse } from 'src/app/contracts/role/GetRolesResponse';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpclientService: HttpClientService) { }

  async getRoles(page: number, size: number, successCallBack?: () => void, errorCallBack?: (msg: string) => void): Promise<GetRolesResponse> {
    const observable: Observable<any> = this.httpclientService.get({
      controller: "roles",
      queryString: `page=${page}&size=${size}`
    })

    const promise = firstValueFrom(observable)

    promise.then(response => successCallBack?.())
      .catch(error => errorCallBack?.(error.message))

    return await promise;
  }

  async create(name: string, successCallBack?: () => void, errorCallBack?: (msg: string) => void) {
    const observable: Observable<any> = this.httpclientService.post({
      controller: "roles"
    }, { name })

    const promise = firstValueFrom(observable);

    promise.then(response => successCallBack?.())
      .catch(error => errorCallBack?.(error.message))

    return await promise as { succeeded: boolean };
  }
}
