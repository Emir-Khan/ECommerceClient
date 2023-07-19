import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { BaseDialog } from '../base/base-dialog';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { Product } from 'src/app/contracts/product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-qrcode-scanning-dialog',
  templateUrl: './qrcode-scanning-dialog.component.html',
  styleUrls: ['./qrcode-scanning-dialog.component.scss']
})
export class QrcodeScanningDialogComponent extends BaseDialog<QrcodeScanningDialogComponent> implements OnInit, OnDestroy {
  constructor(
    dialogRef: MatDialogRef<QrcodeScanningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private qrCodeService: QrCodeService,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private productService: ProductService
  ) {
    super(dialogRef)
  }

  @ViewChild('scanner', { static: true }) scanner: NgxScannerQrcodeComponent
  @ViewChild('txtStock', { static: true }) txtStock: ElementRef<HTMLInputElement>

  ngOnInit(): void {
    this.scanner.start()
  }

  ngOnDestroy(): void {
    this.scanner.stop()
  }

  async onEvent(e) {
    this.spinner.show(SpinnerType.RunningDots)
    const { data } = e
    if (data != null && data != '' && data != undefined) {
      const jsonData = JSON.parse(data)
      const stockValue = parseInt(this.txtStock.nativeElement.value)
      this.toastrService.message(`${jsonData.Name} Product Stock Information Updated To ${stockValue}`, "Success", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
      this.close()
      await this.productService.updateQrCodeProductStock(jsonData.Id, stockValue);
    }
    else {
      this.toastrService.message(`Invalid QR Code`, "Error", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight })
    }
    this.spinner.hide(SpinnerType.RunningDots)
  }
}
