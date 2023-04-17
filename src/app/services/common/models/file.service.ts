import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService: HttpClientService) { }

  async getBaseStorageUrl(): Promise<{ url: string }> {
    const observable = this.httpClientService.get<{ url: string }>({
      controller: "files",
      action: "GetBaseUrl"
    })
    return await firstValueFrom(observable);
  }
}
