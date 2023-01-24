import { Component,OnInit, ViewChild } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  ngOnInit(): void {
    
  }
  
  @ViewChild(ListComponent) listComponent:ListComponent

  createdProduct(createdProduct:CreateProduct){
    this.listComponent.getProducts()
  }
}
