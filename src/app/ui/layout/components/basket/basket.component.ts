import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { CreateOrder } from 'src/app/contracts/order/create-order';
import { BasketItemRemoveDialogComponent, BasketItemRemoveState } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $: any;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private basketService: BasketService,
    private orderService: OrderService, private toastrService: CustomToastrService,
    private router: Router, private dialogService: DialogService) { }

  basketItems: ListBasketItem[]
  async ngOnInit() {
    this.spinner.show(SpinnerType.RunningDots)
    this.basketItems = await this.basketService.getAll();
    this.spinner.hide(SpinnerType.RunningDots)
  }

  async changeQuantity(event: any, basketItemId: string, prevQuantity: number) {
    this.spinner.show(SpinnerType.RunningDots)
    const input = event.target as HTMLInputElement;
    const quantity: number = parseInt(input.value);
    try {
      await this.basketService.updateQuantity({ basketItemId, quantity })
    } catch (error) {
      event.target.value = prevQuantity;
    }
    this.spinner.hide(SpinnerType.RunningDots)
  }

  removeBasketItem(basketItemId: string) {
    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemRemoveState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.RunningDots);
        await this.basketService.remove(basketItemId);

        $("." + basketItemId).fadeOut(600, () => this.spinner.hide(SpinnerType.RunningDots));
      }
    })
  }

  goToCheckout() {
    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialogComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.RunningDots)
        const order = new CreateOrder();
        order.address = "Türkiye";
        order.description = "Ev";
        await this.orderService.create(order);
        $("#basketClose").trigger("click")
        this.spinner.hide(SpinnerType.RunningDots);
        this.toastrService.message("Your order request has been created.", "Order Request", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
        this.router.navigate(["/"]);
      }
    })
  }
}
