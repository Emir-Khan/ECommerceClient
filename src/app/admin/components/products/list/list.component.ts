import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-product';
import { QrcodeDialogComponent } from 'src/app/dialogs/qrcode-dialog/qrcode-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { NotificationService, NotificationType } from 'src/app/services/admin/notification.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ["name", "stock", "price", "createdDate", "photos", "edit", "qrCode", "delete"]
  dataSource: MatTableDataSource<ListProduct> = new MatTableDataSource<ListProduct>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  async ngOnInit() {
    await this.getProducts()
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({ componentType: SelectProductImageDialogComponent, data: id, options: { width: "1120px" } })
  }

  async getProducts() {
    this.showSpinner();
    const products = await this.productService.getAll(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(), errorMessage => this.notificationService.showNotification(NotificationType.Error, "Error", errorMessage))
    this.dataSource = new MatTableDataSource<ListProduct>(products.products)
    this.paginator.length = products.totalProductCount;
  }

  async pageChanged() {
    await this.getProducts();
  }

  async showQrCode(productId: string) {
    this.dialogService.openDialog({ componentType: QrcodeDialogComponent, data: productId })
  }
}
