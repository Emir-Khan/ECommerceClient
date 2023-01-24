import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create-product';
import { NotificationService, NotificationType } from 'src/app/services/admin/notification.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, private notificationService: NotificationService, myspinner:NgxSpinnerService) {
    super(myspinner);
  }

  ngOnInit(): void {

  }
  
  @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter();

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner()
    const createProduct: CreateProduct = new CreateProduct();
    createProduct.name = name.value
    createProduct.stock = parseInt(stock.value)
    createProduct.price = parseInt(price.value)

    this.productService.create(createProduct,
      () => {
        this.hideSpinner()
        this.createdProduct.emit(createProduct);
        this.notificationService.showNotification(NotificationType.Success, "Success", "Product Added")
      }, (msg: string) => {
        this.notificationService.showNotification(NotificationType.Error, "Error", msg)
      }
    );
  }

}
