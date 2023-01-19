import { Component, OnInit } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create-product';
import { NotificationService, NotificationType } from 'src/app/services/admin/notification.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private productService: ProductService, private notificationService: NotificationService) { }

  ngOnInit(): void {

  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    const createProduct: CreateProduct = new CreateProduct();
    createProduct.name = name.value
    createProduct.stock = parseInt(stock.value)
    createProduct.price = parseInt(price.value)

    this.productService.create(createProduct, () =>
     this.notificationService.showNotification(NotificationType.Success, "Success", "Product Added")
     , (msg: string) => this.notificationService.showNotification(NotificationType.Error, "Error", msg));
  }

}
