import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { CreateBasketItem } from 'src/app/contracts/basket/create-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) { }

  async getAll(): Promise<ListBasketItem[]> {
    const observable: Observable<ListBasketItem[]> = this.httpClientService.get({
      controller: "baskets"
    });

    return await firstValueFrom(observable);
  }

  async add(basketItem: CreateBasketItem) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "baskets"
    }, basketItem)

    await firstValueFrom(observable);
  }

  async updateQuantity(basketItem: Partial<UpdateBasketItem>) {
    const observable = this.httpClientService.put({
      controller: "baskets"
    }, basketItem)

    await firstValueFrom(observable);
  }

  async remove(basketItemId: string) {
    const observable = this.httpClientService.delete({
      controller: "baskets"
    }, basketItemId)

    await firstValueFrom(observable);
  }
}
