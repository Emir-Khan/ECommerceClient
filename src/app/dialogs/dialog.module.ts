import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog/shopping-complete-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { CompleteOrderDialogComponent } from './complete-order-dialog/complete-order-dialog.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    BasketItemRemoveDialogComponent,
    ShoppingCompleteDialogComponent,
    OrderDetailDialogComponent,
    CompleteOrderDialogComponent,
    AuthorizeMenuDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule, MatIconModule,
    MatRadioModule, MatTableModule, MatChipsModule, MatListModule, MatBadgeModule,
    FileUploadModule
  ]
})
export class DialogModule { }
