import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, firstValueFrom } from 'rxjs';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ListProduct } from 'src/app/contracts/list-product';
import { ListProductImage } from 'src/app/contracts/list-product-image';
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
  async delete(id: string) {
    const deleteObs: Observable<any> = this.httpClientService.delete({ controller: "products" }, id);
    await firstValueFrom(deleteObs)
  }
  async getAll(page: number = 0, size: number = 5, successCallBack?: () => void, errorCalllBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number, products: ListProduct[] }> {
    const readObservable: Observable<{ totalProductCount: number, products: ListProduct[] }> = this.httpClientService
      .get<{ totalProductCount: number, products: ListProduct[] }>({ controller: "products", queryString: `page=${page}&size=${size}` })
    const promiseData: Promise<{ totalProductCount: number, products: ListProduct[] }> = lastValueFrom(readObservable)

    promiseData.then(d => successCallBack()).catch((errorResult: HttpErrorResponse) => errorCalllBack(errorResult.message))

    return await promiseData;
  }
  async readImages(id: string, successCallBack?: () => void): Promise<ListProductImage[]> {
    const getObservable: Observable<ListProductImage[]> = this.httpClientService.get<ListProductImage[]>({
      action: "getproductimages", controller: "products"
    }, id)
    const images: ListProductImage[] = await firstValueFrom(getObservable)
    successCallBack();
    return images;
  }
  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deleteObservable);
    successCallBack();
  }
  async changeShowCaseImage(imageId: string, productId: string, successCallBack?: () => void) {
    const observable = this.httpClientService.get({
      controller: "products",
      action: "ChangeShowcaseImage",
      queryString: `imageId=${imageId}&productId=${productId}`
    })
    await firstValueFrom(observable);

    successCallBack();
  }
}
