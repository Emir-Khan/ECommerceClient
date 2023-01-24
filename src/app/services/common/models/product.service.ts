import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ListProduct } from 'src/app/contracts/list-product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, successCallBack?: () => void, errorCalllBack?: (errorMessage: string) => void) {
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
  async getAll(page: number = 0, size: number = 5, successCallBack?: () => void, errorCalllBack?: (errorMessage: string) => void): Promise<{totalCount:number,products: ListProduct[]}> {
    const promiseData: Promise<{totalCount:number,products: ListProduct[]}> = lastValueFrom(this.httpClientService
      .get<{totalCount:number,products: ListProduct[]}>({ controller: "products", queryString: `page=${page}&size=${size}` }))

    promiseData.then(d => successCallBack()).catch((errorResult: HttpErrorResponse) => errorCalllBack(errorResult.message))

    return await promiseData;
  }
}
