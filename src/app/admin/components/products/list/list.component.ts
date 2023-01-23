import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListProduct } from 'src/app/contracts/list-product';
import { NotificationService } from 'src/app/services/admin/notification.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name", "stock", "price", "createdDate", "updatedDate"]
  dataSource: MatTableDataSource<ListProduct> = new MatTableDataSource<ListProduct>;

  constructor(private productService:ProductService,private notificationService:NotificationService) { }

  ngOnInit(): void {
    // this.productService.getAll(()=>)
  }

}
