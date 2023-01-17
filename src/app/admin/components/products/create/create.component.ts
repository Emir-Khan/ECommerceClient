import { Component, OnInit } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    const createProduct:CreateProduct = new CreateProduct();
    createProduct.name = name.value
    createProduct.stock = parseInt(stock.value)
    createProduct.price = parseInt(price.value)

    this.productService.create(createProduct);
  }

}
