import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from 'src/app/contracts/order/create-order';
import { Observable, firstValueFrom } from 'rxjs';
import { ListOrder } from 'src/app/contracts/order/list-order';
import { SingleOrder } from 'src/app/contracts/order/single-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService: HttpClientService) { }

  async create(order: CreateOrder) {
    const observable = this.httpClientService.post({
      controller: "orders"
    }, order);

    await firstValueFrom(observable);
  }

  async getAll(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalOrderCount: number, orders: ListOrder[] }> {
    const observable: Observable<{ totalOrderCount: number, orders: ListOrder[] }> = this.httpClientService.get({
      controller: "orders",
      queryString: `page=${page}&size=${size}`
    });

    const promise = firstValueFrom(observable);
    promise.then(() => successCallBack()).catch((error) => errorCallBack(error))

    return await promise;
  }

  async getById(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<SingleOrder> = this.httpClientService.get({
      controller: "orders"
    }, id);

    const promise = firstValueFrom(observable)
    promise.then(() => successCallBack())
      .catch((error) => errorCallBack(error));

    return await promise;
  }

  async completeOrder(id: string) {
    const observable = this.httpClientService.get({
      controller: "orders",
      action: "complete-order"
    }, id);

    await firstValueFrom(observable);
  }
}
