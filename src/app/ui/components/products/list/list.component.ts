import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private fileService: FileService, private basketService: BasketService,
    private spinner: NgxSpinnerService, private toastrService: CustomToastrService) { }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 8;
  pageList: number[] = [];

  products: ListProduct[];
  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data = await this.productService.getAll(this.currentPageNo - 1, 8,
        () => {

        },
        errorMessage => {

        });
      const storageBaseUrl = (await this.fileService.getBaseStorageUrl()).url;
      this.products = await Promise.all(data.products.map(async ({ id, name, price, stock, createdDate, updatedDate, productImageFiles }) => {
        const imgPath = productImageFiles.find(pif => pif.showCase)?.path;
        const listProduct: ListProduct = {
          id,
          name,
          price,
          stock,
          createdDate,
          updatedDate,
          imagePath: productImageFiles.length && imgPath ? `${storageBaseUrl}/${imgPath}` : "assets/img/product/default-product.png"
        };
        return listProduct;
      }));

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

      const startPage = Math.max(1, this.currentPageNo - 3);
      const endPage = Math.min(this.totalPageCount, this.currentPageNo + 3);

      for (let i = startPage; i <= endPage; i++) {
        this.pageList.push(i);
      }

      if (this.pageList.length < 7) {
        if (startPage === 1) {
          for (let i = endPage + 1; i <= Math.min(this.totalPageCount, endPage + (7 - this.pageList.length)); i++) {
            this.pageList.push(i);
          }
        } else if (endPage === this.totalPageCount) {
          for (let i = startPage - 1; i >= Math.max(1, startPage - (7 - this.pageList.length)); i--) {
            this.pageList.unshift(i);
          }
        }
      }
    })

  }

  async addToBasket(product: ListProduct) {
    this.spinner.show(SpinnerType.RunningDots)
    await this.basketService.add({
      productId: product.id,
      quantity: 1
    })
    this.spinner.hide(SpinnerType.RunningDots)
    this.toastrService.message("Product Added To Cart", "Success", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    })
  }
}
