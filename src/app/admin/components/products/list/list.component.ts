import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-product';
import { NotificationService, NotificationType } from 'src/app/services/admin/notification.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ["name", "stock", "price", "createdDate","edit","delete"]
  dataSource: MatTableDataSource<ListProduct> = new MatTableDataSource<ListProduct>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService, private notificationService: NotificationService, spinner: NgxSpinnerService) {
    super(spinner);
  } 

  async ngOnInit() {
    await this.getProducts()
  }

  async getProducts() {
    this.showSpinner();
    const products = await this.productService.getAll(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(), errorMessage => this.notificationService.showNotification(NotificationType.Error, "Error", errorMessage))
    this.dataSource = new MatTableDataSource<ListProduct>(products.products)
    this.paginator.length = products.totalCount;
  }

  async pageChanged(){
    await this.getProducts();
  }
}
