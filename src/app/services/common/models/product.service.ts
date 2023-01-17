import { Injectable } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create-product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct) {
    this.httpClientService.post({ controller: "products" }, product).subscribe(result=>alert("basarili"))
  }
}
