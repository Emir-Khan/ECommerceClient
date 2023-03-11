import { Component, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {
  /**
   *
   */
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string) {
    super(dialogRef);
  }

  @Output() options:Partial<FileUploadOptions>= {
    accept:".png, .jpg, .jpeg, .gif",
    action:"upload",
    controller:"products",
    explanation:"Select or Drag Images",
    queryString:`id=${this.data}`,
    isAdminPage:true
  }
}

export enum SelectProductImageState {
  Close
}