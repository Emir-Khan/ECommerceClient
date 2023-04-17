import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { BasketService } from 'src/app/services/common/models/basket.service';

declare var $: any;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private basketService: BasketService) { }

  basketItems: ListBasketItem[]
  async ngOnInit() {
    this.spinner.show(SpinnerType.RunningDots)
    this.basketItems = await this.basketService.getAll();
    this.spinner.hide(SpinnerType.RunningDots)
  }

  async changeQuantity(event: Event, basketItemId: string) {
    this.spinner.show(SpinnerType.RunningDots)
    const input = event.target as HTMLInputElement;
    const quantity: number = parseInt(input.value);
    await this.basketService.updateQuantity({ basketItemId, quantity })
    this.spinner.hide(SpinnerType.RunningDots)
  }

  async removeBasketItem(basketItemId: string) {
    this.spinner.show(SpinnerType.RunningDots);
    await this.basketService.remove(basketItemId);

    var a = $("." + basketItemId)
    $("." + basketItemId).fadeOut(600, () => this.spinner.hide(SpinnerType.RunningDots));
  }
}
