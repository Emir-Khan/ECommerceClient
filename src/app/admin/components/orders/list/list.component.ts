import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-product';
import { ListOrder } from 'src/app/contracts/order/list-order';
import { OrderDetailDialogComponent, OrderDetailDialogState } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { NotificationService, NotificationType } from 'src/app/services/admin/notification.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ["orderCode", "userName", "totalPrice", "createdDate", "viewdetail", "delete"]
  dataSource: MatTableDataSource<ListOrder> = new MatTableDataSource<ListOrder>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  async ngOnInit() {
    await this.getOrders()
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({ componentType: SelectProductImageDialogComponent, data: id, options: { width: "1120px" } })
  }

  async getOrders() {
    this.showSpinner();
    const orders = await this.orderService.getAll(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(), errorMessage => this.notificationService.showNotification(NotificationType.Error, "Error", errorMessage))
    this.dataSource = new MatTableDataSource<ListOrder>(orders.orders)
    this.paginator.length = orders.totalOrderCount;
  }

  async pageChanged() {
    await this.getOrders();
  }

  showDetail(id: number) {
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: id
    })
  }
}
