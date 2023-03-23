import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    // const a = document.querySelector(".overflow-hiddens");
    // const ps = new PerfectScrollbar(a)

    // this.httpClientService.get<Product[]>({ controller: "products" }).subscribe(data => console.log(data))
  }

  create(){
    this.httpClientService.post({controller:"products"},{name:"Laptop",stock:50,price:2500}).subscribe()
  }

  update(){
    this.httpClientService.put({controller:"products"},{id:"d59d99df-3bb4-4203-b329-a4aaf6006e6a",name:"Laptop",stock:50,price:1750}).subscribe()
  }

  remove(){
    this.httpClientService.delete({controller:"products"},"d59d99df-3bb4-4203-b329-a4aaf6006e6a").subscribe()
  }

}
