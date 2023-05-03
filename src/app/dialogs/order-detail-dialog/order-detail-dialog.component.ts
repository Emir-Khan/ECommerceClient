import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OrderService } from 'src/app/services/common/models/order.service';
import { SingleOrder } from 'src/app/contracts/order/single-order';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { NotificationService, NotificationType } from 'src/app/services/admin/notification.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService) {
    super(dialogRef)
  }

  dataSource = [];
  columnsToDisplay = ['name', 'quantity', 'price', 'totalPrice'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;
  singleOrder: SingleOrder
  totalPrice: number;

  async ngOnInit() {
    this.singleOrder = await this.orderService.getById(this.data as string)
    this.dataSource = this.singleOrder.basketItems
    this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
  }

  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.RunningDots)
        await this.orderService.completeOrder(this.data as string)
        this.spinner.hide(SpinnerType.RunningDots)
        this.notificationService.showNotification(NotificationType.Success, 'Success', "Order completed successfully")
      }
    })
  }
}

export enum OrderDetailDialogState {
  Close, Complete
}