import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  ngOnInit(): void {
const a = document.querySelector(".overflow-hiddens");
console.log(a);

    const ps=  new PerfectScrollbar(a)
    console.log("asd",ps);
  }

}
