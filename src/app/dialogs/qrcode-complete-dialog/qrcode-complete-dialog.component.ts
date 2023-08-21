import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-qrcode-complete-dialog',
  templateUrl: './qrcode-complete-dialog.component.html',
  styleUrls: ['./qrcode-complete-dialog.component.scss']
})
export class QrcodeCompleteDialogComponent extends BaseDialog<QrcodeCompleteDialogComponent> {

  constructor(dialogRef: MatDialogRef<QrcodeCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(dialogRef);
  }
}

export enum CompleteQrCodeState {
  Yes,
  No
}
