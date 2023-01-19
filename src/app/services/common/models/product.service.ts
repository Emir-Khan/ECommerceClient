import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create-product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, successCallBack?: any, errorCalllBack?: any) {
    this.httpClientService.post({ controller: "products" }, product)
      .subscribe({
        next: result => successCallBack()
        , error: (errorResult: HttpErrorResponse) => {
          const _error: Array<{ key: string, value: Array<string> }> = errorResult.error;
          let message = "";
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          })
          errorCalllBack(message)
        }
      })
  }
}
