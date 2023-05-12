import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientService: HttpClientService) { }

  async assignRoleEndpoint(roles: string[], code: string, menu: string, successCallback?: () => void, errorCallback?: (error: any) => void) {
    const observable = this.httpClientService.post({
      controller: "AuthorizationEndpoints",
    }, { roles, code, menu })

    const promise = firstValueFrom(observable);
    promise.then(response => successCallback?.()).catch(error => errorCallback?.(error.message));

    return await promise;
  }

  async getEndpointRoles(code: string, name: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<string[]> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "AuthorizationEndpoints",
      action: "GetEndpointRoles"
    }, { code, name })

    const promise = firstValueFrom(observable);
    promise.then(response => successCallback?.()).catch(error => errorCallback?.(error.message));

    return (await promise).roles;
  }
}
