import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ListComponent } from './list/list.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { QrcodeScanningDialogComponent } from 'src/app/dialogs/qrcode-scanning-dialog/qrcode-scanning-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(private dialogService: DialogService) { }

  @ViewChild(ListComponent) listComponent: ListComponent

  createdProduct(createdProduct: CreateProduct) {
    this.listComponent.getProducts()
  }

  showProductQrCodeScanningDialog() {
    this.dialogService.openDialog({
      componentType: QrcodeScanningDialogComponent,
      data: null,
    })
  }
}
